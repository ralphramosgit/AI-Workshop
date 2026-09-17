export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <section className="hero">
          <h1>Ralph AI Workshop</h1>
          <p className="tagline">a senior at UH Manoa studying linguistics</p>
        </section>

        <section className="section">
          <h2>About</h2>
          <p>
            Ralph is a senior at the University of Hawai&apos;i at Manoa studying
            linguistics, with a particular interest in how language structure
            shapes meaning and communication. He enjoys combining close
            analysis of language with hands-on technical projects. Outside of
            coursework, he likes exploring how computational tools can support
            linguistic research.
          </p>
        </section>

        <section className="section">
          {/* Placeholder items — replace with actual current-semester details later */}
          <h2>This semester</h2>
          <ul className="semester-list">
            <li>Taking a syntax seminar focused on comparative sentence structure</li>
            <li>Working on a senior capstone project analyzing dialect variation in Hawai&apos;i</li>
            <li>Volunteering with a campus language documentation initiative</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Ralph AI Workshop &copy; {year}</p>
      </footer>
    </>
  );
}
