import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Share2, Play, Pause, X } from "lucide-react";
import { radioService } from "@/lib/radioService";
import capaAlbum from "@/assets/capaAlbum.png";

const API_URL = "https://radiovox.conectastm.com/api/ODc1OCsw";

const PlayerGlobal = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(radioService.getPlayingState());
  const [musica, setMusica] = useState("Rádio Maravilha 96.9 FM");
  const [artista, setArtista] = useState("");
  const [capa, setCapa] = useState(capaAlbum);
  const [isActive, setIsActive] = useState(radioService.getGlobalPlayerActive());

  const isOuvirAoVivo = location.pathname === "/ouvir-ao-vivo";

  useEffect(() => {
    const unsubscribe = radioService.subscribe((playing) => {
      setIsPlaying(playing);
      if (playing) {
        radioService.activateGlobalPlayer();
        setIsActive(true);
      }
    });
    return unsubscribe;
  }, []);

useEffect(() => {
  if (!isActive) return;

  let mounted = true;

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

      if (!mounted) return;

      // Quando não tem música tocando
      if (
        musicaAtual.includes("Radio Maravilha") ||
        musicaAtual.includes("Rádio Maravilha")
      ) {
        setMusica("Rádio Maravilha FM");
        setArtista("");
        setCapa(capaAlbum);
        return;
      }

      // Quando tem música (formato Artista - Música)
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
        setMusica(musicaAtual || "Rádio Maravilha FM");
        setArtista("");
        setCapa(capaAlbum);
      }
    } catch (err) {
      console.error("Erro ao buscar dados da rádio:", err);
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 30000);

  return () => {
    mounted = false;
    clearInterval(interval);
  };
}, [isActive]);

  const togglePlay = () => radioService.toggle();

  const handleShare = () => {
    const shareData = {
      title: "Rádio Maravilha 96.9 FM",
      text: "Ouça agora a Rádio Maravilha ao vivo!",
      url: "",
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error(err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("🔗 Link copiado para a área de transferência!");
    }
  };

  // 🔹 NOVO: botão “X” fecha e reseta o player global
  const handleClose = () => {
    radioService.pause(); // pausa o áudio
    radioService.resetGlobalPlayer(); // reseta flag global e localStorage
    setIsActive(false); // remove da tela
  };

  if (!isActive || isOuvirAoVivo) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-black/70 to-black/70 text-white transition-all duration-300 ease-in-out backdrop-blur-md ${
        isExpanded ? "h-80" : "h-16"
      }`}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {!isExpanded && (
            <img src={capa} alt="Capa" className="w-10 h-10 rounded-full object-cover" />
          )}
          <div>
            <h2 className="font-semibold text-sm">Rio de Janeiro 96.9 FM</h2>
            <p className="text-xs text-gray-300 truncate max-w-[150px]">{musica}</p>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          {!isExpanded && (
            <button onClick={togglePlay} className="hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause size={24} fill="white" />
              ) : (
                <Play size={24} fill="white" className="ml-1" />
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isExpanded && (
            <button onClick={handleShare} title="Compartilhar">
              <Share2 size={20} />
            </button>
          )}
          {/* 🔹 NOVO BOTÃO DE FECHAR */}
          <button onClick={handleClose} title="Fechar player">
            <X size={22} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Minimizar" : "Expandir"}
          >
            {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>
        </div>
      </div>

      {/* Expandido */}
      {isExpanded && (
        <div className="flex flex-col items-center mt-0 animate-fade-in">
          <img
            src={capa}
            alt="Capa"
            className="w-32 h-32 rounded-2xl shadow-lg mb-1 object-cover"
          />
          <h3 className="text-lg font-bold text-center">{musica}</h3>
          {artista && (
            <p className="text-sm text-gray-300 text-center mb-1">{artista}</p>
          )}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
          >
            {isPlaying ? (
              <Pause size={32} fill="white" />
            ) : (
              <Play size={32} fill="white" className="ml-1" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerGlobal;
