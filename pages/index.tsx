import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [fileInput, setfileInput] = useState<File>();
  const [progress, setprogress] = useState<number>(0);

  useEffect(function () {

    if (fileInput) {

      const reader = new FileReader();
      reader.readAsDataURL(fileInput as File)
      reader.onloadend = async function () {

        const fileBase64 = (reader.result as string).split(';base64,').pop() as string;
        const fileChunks = Math.ceil(fileBase64.length / (1024 * 1000));

        for (let i = 1; i <= fileChunks; i++) {

          await fetch('http://localhost:3000/api/hello', {
            method: 'PUT', body: JSON.stringify(
              { fileName: fileInput.name, chunk: i, total: fileChunks, file: fileBase64.slice((i - 1) * 1024 * 1000, i * 1024 * 1000) })
          })

          setprogress(i / fileChunks);

        }

      }

    }

  }, [fileInput])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="file" onChange={(e) => setfileInput((e.target.files as FileList)[0])}></input>
      <progress id="file" value={progress} max="1"> 32% </progress>

    </div>
  )
}

export default Home
