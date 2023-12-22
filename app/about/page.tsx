
const AboutPage: React.FC = () => {
  return (
    <main className="flex flex-col  items-center gap-9 px-4 md:px-64  py-12 bombay-bg-color cold-gray-color">
      <div className="container mx-auto px-1 py-6 max-md:w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          About this web app.
        </h1>
        <p className="text-base md:text-lg text-justify mb-4">
          Economic Scholar Filter is designed to enhance your research
          experience within the field of economics. The web app streamlines the
          process of searching for academic references on Google Scholar by
          enabling seamless filtering by subsets of economic journals. This
          tailored approach addresses the common challenge faced by many
          researchers and students - sifting through extensive search results to
          find relevant academic publications.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
          Facilitating Research
        </h2>
        <p className="text-base md:text-lg text-justify mb-4">
          We understand the frustration of navigating Google Scholar&apos;s
          advanced search options. That&apos;s why Economic Scholar Filter
          offers a smooth solution with an intuitive and user-friendly
          interface. The aim is to make your research process more efficient,
          allowing you to focus on what truly matters - the content of your
          work.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
          Personalized Experience
        </h2>
        <p className="text-base md:text-lg text-justify mb-4">
          With Economic Scholar Filter, you can create a personalized
          experience:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            {" "}
            <strong>Customizable Filters:</strong> Tailor your search to align
            with your specific research interests within the vast field of
            economics.
          </li>
          <li>
            <strong>User Registration:</strong> Sign up and log in to save your
            favorite subsets of journals for quick access in future searches.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
          Development
        </h2>
        <p className="text-base md:text-lg text-justify mb-4">
          Economic Scholar Filter is a solo endeavor, brought to life by my
          willingness for facilitating my own academic research.
        </p>
        <p className="text-base md:text-lg text-justify mb-4">
          The web app is a fully functional prototype and it might change in the
          future. This could affect the user experience, database structure, and
          other aspects of the app. I will try to keep the changes to a minimum,
          and I will try to keep the app as stable as possible. I will also try
          to keep the app free, but I might introduce a paid subscription in the
          future on some new features (because I might have to pay for server hosting).
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
          Future Enhancements
        </h2>
        <p className="text-base md:text-lg text-justify mb-4">
          Looking ahead, I plan to introduce more features:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Expanded Favorites:</strong> Save more of your preferred
            journal subsets for even more customized searches.
          </li>
          <li>
            <strong>Advanced Ranking Options:</strong> Allow users to choose
            among different categorization (especially on rankings). I was
            thinking of potentially creating a dynamic ranking that would change
            depending on users favorites or votes.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
          We Value Your Feedback
        </h2>
        <p className="text-base md:text-lg text-justify mb-4">
          Your insights and suggestions are welcome. For feedback, support, or
          inquiries, please reach out at{" "}
          <a
            href="mailto:npasquier.dev@gmail.com"
            className="text-blue-600 hover:text-blue-800"
          >
            npasquier.dev@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
