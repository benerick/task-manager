import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import LoginForm from "@/components/auth/LoginForm";
import { login, restoreSession } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { encrypt, decrypt } from "@/utils/cryptoHelpers";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  // Verifica si hay datos de sesion en localStorage. 
  // Redirige si sesion ya existe y es valida
  useEffect(() => {
    const saved = localStorage.getItem("session");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const token = decrypt(parsed.token);
      const email = parsed.email;
      dispatch(restoreSession({ token, email }));
      router.push("/dashboard");
    } catch {
      localStorage.removeItem("session");
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      const encryptedToken = encrypt(result.payload.token);

      localStorage.setItem(
        "session",
        JSON.stringify({
          email: result.payload.email,
          token: encryptedToken,
        }),
      );

      router.push("/dashboard");
    }
  }

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Aplicacion Task Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <h1>Iniciar Sesión</h1>

          <LoginForm
            error={error}
            loading={loading}
            onSubmit={handleLogin}
          />
        </main>
      </div>
    </>
  );
}
