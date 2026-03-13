import logomaravilha_footer from "@/assets/logomaravilha_footer.png";

const Footer = () => {
  return (
<footer className="bg-primary py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <img
              src={logomaravilha_footer}
              alt="Logo Rádio Maravilha"
              className="w-40 animate-fade-in"
            />
          </div>

          <div className="text-white space-y-2 md:text-right">
            <a target="_blank" href="https://www.google.com/maps/search/Rua+da+Assembleia,+92,+Sala+1301+-+Centro+-+Rio+de+Janeiro%2FRJ+-+CEP:+20.011-000/@-22.9057968,-43.1803203,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">Rua da Assembleia, 92, Sala 1301 - Centro - Rio de Janeiro/RJ - CEP: 20.011-000</a>
            {/* <p className="text-sm md:text-base">
              Whatsapp:{" "}
              <a
                href="https://wa.me/5531999982089"
                className="font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                (31) 99998-2089
              </a>
            </p> */}

            <p className="text-xs text-gray-200 mt-2">
              © 2025 Rádio 96.1 Maravilha FM — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
