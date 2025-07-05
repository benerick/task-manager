import Head from "next/head";
import styles from "@/styles/Home.module.css";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {

  const handleLogin = (email: string, password: string) => {
    console.log(email, password);
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
            error={null}
            loading={false}
            onSubmit={handleLogin}
          />
        </main>
      </div>
    </>
  );
}
