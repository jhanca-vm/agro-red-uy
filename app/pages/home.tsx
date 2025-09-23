import image from '~/assets/hero.webp'

export default function Home() {
  return (
    <>
      <title>AgroRedUy</title>
      <main>
        <section className="my-16 text-center text-xl">
          <h1 className="mb-8 font-medium text-5xl text-green-700">
            ¡Bienvenido a AgroRedUy!
          </h1>
          <p className="max-w-prose mx-auto font-light">
            Tu plataforma para conectar el campo con el futuro. Explora nuestra
            amplia variedad de productos agrícolas y recursos.
          </p>
          <img className="mt-12 inline-block w-75" src={image} alt="" />
        </section>
      </main>
    </>
  )
}
