export default function AboutPage() {
  const founders = [
      {
      name: "Rumpa Das",
      img: "/founders/rumpa.jpeg",
      linkedin: "https://www.linkedin.com/in/rumpadas1",
    },
    {
      name: "Sanchita Debnath",
      img: "/founders/sanchita.jpeg",
      linkedin: "https://www.linkedin.com/in/sanchita-debnath-welcome2586/",
    },
  
    {
      name: "Sayani Dey",
      img: "/founders/sayani.jpeg",
      linkedin: "https://www.linkedin.com/in/sayani-dey-1965b526b/",
    },
    {
      name: "Kaberi Mondal",
      img: "/founders/kaberi.jpeg",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-lime-400">About Geneva</h1>

        <p className="text-lg leading-relaxed mb-10">
          <strong>Geneva</strong> is a web-based DNA analysis tool designed to make genetic data interpretation easier,
          faster, and more visual. Geneva offers features like detecting potential genetic disorders by identifying known DNA patterns, highlighting significant mutations, and translating DNA into the proteins our bodies rely on. It also allows users to explore the characteristics of amino acids, understand protein behavior like solubility, and visualize base distributions within a sequence. From spotting tiny mutations to understanding the structure and function of genetic material, Geneva turns complex biological data into an intuitive experience anyone can explore.
        </p>

        <h2 className="text-2xl font-bold text-lime-300 mb-6">👩‍💻 Founders</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-green-900/30 rounded-xl shadow-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={founder.img}
                alt={founder.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-lime-400"
              />
              <h3 className="text-lg font-semibold text-lime-200">{founder.name}</h3>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-medium"
                  style={{ color: "#0077B5" }}
                >
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-lime-300 mb-6">🎓 Project Supervisor</h2>

        <div className="flex justify-center">
          <div className="bg-green-900/30 rounded-xl shadow-lg p-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/founders/sumana.jpeg"
              alt="Dr. Sumana Bandopadhyay"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-lime-400"
            />
            <h3 className="text-lg font-semibold text-lime-200">Dr. Sumana Bandopadhyay</h3>
            <p className="text-sm text-gray-400 mt-2 text-center">
              HOD, Department of Computer Science<br />
              Prabhu Jagatbandhu College
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-400 italic text-center">
          Built with ❤️ by a team of Computer Science undergrads in 2025.
        </p>
      </div>
    </main>
  );
}
