import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";

const AssistirAoVivo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <main className="pt-32 pb-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="overflow-hidden shadow-card animate-fade-in">
            {/* STREAM AO VIVO */}
            <div className="aspect-video bg-black relative">
              <iframe
                src="https://playerv.srvstm.com/video/radioenergia4279//true/false/YzNSdGRqRXVjM0oyYzNSdExtTnZiUT09K0Q=/16:9/nao/nao/nao" // TROCAR TRANSNMISSAO AO VIVO
                title="Transmissão ao vivo - Rádio Maravilha 96.9 FM"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

          </Card>

         
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssistirAoVivo;