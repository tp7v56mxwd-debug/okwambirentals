import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Trash2, ArrowLeft, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VehiclePhoto {
  id: string;
  vehicle_type: string;
  image_url: string;
  display_order: number;
}

const VehiclePhotos = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [photos, setPhotos] = useState<VehiclePhoto[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("jetski");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!isAdmin) {
      navigate("/");
      return;
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    fetchPhotos();
  }, [selectedVehicle]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("vehicle_photos")
        .select("*")
        .eq("vehicle_type", selectedVehicle)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast.error("Erro ao carregar fotos");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        // Upload to storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${selectedVehicle}/${Date.now()}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("vehicle-photos")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("vehicle-photos")
          .getPublicUrl(fileName);

        // Get next display order
        const maxOrder = photos.length > 0 
          ? Math.max(...photos.map(p => p.display_order))
          : 0;

        // Insert into database
        const { error: dbError } = await supabase
          .from("vehicle_photos")
          .insert({
            vehicle_type: selectedVehicle,
            image_url: publicUrl,
            display_order: maxOrder + 1
          });

        if (dbError) throw dbError;
      }

      toast.success("Fotos adicionadas com sucesso!");
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast.error("Erro ao adicionar fotos");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (photo: VehiclePhoto) => {
    try {
      // Delete from storage
      const path = photo.image_url.split("/vehicle-photos/")[1];
      if (path) {
        await supabase.storage.from("vehicle-photos").remove([path]);
      }

      // Delete from database
      const { error } = await supabase
        .from("vehicle_photos")
        .delete()
        .eq("id", photo.id);

      if (error) throw error;

      toast.success("Foto removida com sucesso!");
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Erro ao remover foto");
    }
  };

  const updateDisplayOrder = async (photoId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from("vehicle_photos")
        .update({ display_order: newOrder })
        .eq("id", photoId);

      if (error) throw error;
      fetchPhotos();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Erro ao atualizar ordem");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Galeria de Fotos dos Veículos</CardTitle>
            <CardDescription>
              Gerencie as fotos exibidas no carousel de cada veículo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type">Tipo de Veículo</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger id="vehicle-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jetski">Jet Ski</SelectItem>
                  <SelectItem value="atv">ATV</SelectItem>
                  <SelectItem value="utv">UTV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo-upload">Adicionar Fotos</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button disabled={uploading}>
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? "Enviando..." : "Enviar"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Selecione uma ou várias imagens para adicionar
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Fotos Atuais ({photos.length})</Label>
                <Badge variant="secondary">
                  {selectedVehicle.toUpperCase()}
                </Badge>
              </div>

              {loading ? (
                <p className="text-center text-muted-foreground py-8">Carregando...</p>
              ) : photos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma foto adicionada ainda
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative aspect-square">
                        <img
                          src={photo.image_url}
                          alt={`${selectedVehicle} ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => handleDelete(photo)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs">
                            #{photo.display_order}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-6 w-6"
                              onClick={() => updateDisplayOrder(photo.id, photo.display_order - 1)}
                              disabled={index === 0}
                            >
                              ←
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-6 w-6"
                              onClick={() => updateDisplayOrder(photo.id, photo.display_order + 1)}
                              disabled={index === photos.length - 1}
                            >
                              →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehiclePhotos;