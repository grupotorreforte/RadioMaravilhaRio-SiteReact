import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import bannerAnuncio from "@/assets/anuncio.png";
import capaAlbum from "@/assets/capaAlbum.png";
import { radioService } from "@/lib/radioService";

const API_URL = "https://radiovox.conectastm.com/api/ODc1OCsw"; // TROCAR API

const OuvirAoVivo = () => {
  const [isPlaying, setIsPlaying] = useState(radioService.getPlayingState());
  const [volume, setVolume] = useState([70]);
  const [musica, setMusica] = useState("Rádio Maravilha 96.9 FM");
  const [artista, setArtista] = useState("");
  const [capa, setCapa] = useState(capaAlbum);

useEffect(() => {
  const unsubscribe = radioService.subscribe((playing) => setIsPlaying(playing));

  return () => {
    if (typeof unsubscribe === "function") {
      unsubscribe();
    }
  };
}, []);



  const togglePlay = () => {
  radioService.toggle();
  radioService.activateGlobalPlayer(); 
};


    useEffect(() => {
      radioService.setVolume(volume[0] / 100);
    }, [volume]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const xmlText = await res.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const musicaAtual =
          xml.querySelector("musica_atual")?.textContent || "";
        const capaMusica =
          xml.querySelector("capa_musica")?.textContent || "";

        // Se estiver tocando apenas o nome da rádio
        if (
          musicaAtual.includes("Radio Maravilha") ||
          musicaAtual.includes("Rádio Maravilha")
        ) {
          setMusica("Rádio Maravilha FM");
          setArtista("");
          setCapa(capaAlbum);
          return;
        }

        // Se tiver música (formato Artista - Música)
        if (musicaAtual.includes(" - ")) {
          const [artistaNome, titulo] = musicaAtual.split(" - ");

          setMusica(titulo.trim());
          setArtista(artistaNome.trim());

          if (capaMusica && capaMusica !== "") {
            setCapa(capaMusica);
          } else {
            setCapa(capaAlbum);
          }
        } else {
          // fallback
          setMusica(musicaAtual || "Radio Maravilha FM");
          setArtista("");
          setCapa(capaAlbum);
        }
      } catch (err) {
        console.error("Erro ao buscar dados da rádio:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <main className="pt-32 pb-12 min-h-screen">
        <div className="container mx-auto px-10 max-w-4x1">

          <Card className="p-8 md:p-12 shadow-card animate-fade-in">


            <div className="space-y-8">
              <div className="flex justify-center">
                <img
                  src={capa}
                  alt={musica}
                  className="w-64 h-64 rounded-2xl shadow-glow object-cover"
                />
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{musica}</h2>
                <p className="text-lg text-muted-foreground">{artista}</p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-primary hover:bg-primary-light text-primary-foreground flex items-center justify-center transition-all hover:scale-110 shadow-glow"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
              </div>

              <div className="flex items-center gap-4 max-w-xs mx-auto">
                <Volume2 className="text-muted-foreground" size={20} />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OuvirAoVivo;
