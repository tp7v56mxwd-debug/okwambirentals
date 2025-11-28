import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Shield, ShieldCheck, Loader2, Copy } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import QRCode from 'qrcode';

export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [hasMFA, setHasMFA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [totpSecret, setTotpSecret] = useState('');
  const [factorId, setFactorId] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkMFAStatus();
  }, [user, navigate]);

  const checkMFAStatus = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) throw error;

      const activeFactor = data?.totp?.find(factor => factor.status === 'verified');
      setHasMFA(!!activeFactor);
      if (activeFactor) {
        setFactorId(activeFactor.id);
      }
    } catch (error) {
      console.error('Error checking MFA status:', error);
      toast.error('Erro ao verificar status do 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const enrollMFA = async () => {
    try {
      setIsEnrolling(true);
      
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Aplicativo Autenticador'
      });

      if (error) throw error;

      // Generate QR code
      const qrCode = await QRCode.toDataURL(data.totp.qr_code);
      setQrCodeUrl(qrCode);
      setTotpSecret(data.totp.secret);
      setFactorId(data.id);

      toast.success('Escaneie o QR code com seu aplicativo autenticador');
    } catch (error: any) {
      console.error('Error enrolling MFA:', error);
      toast.error(error.message || 'Erro ao configurar 2FA');
    } finally {
      setIsEnrolling(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Por favor, insira o código de 6 dígitos');
      return;
    }

    try {
      setIsEnrolling(true);

      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verificationCode
      });

      if (verify.error) throw verify.error;

      toast.success('2FA ativado com sucesso!');
      setHasMFA(true);
      setQrCodeUrl('');
      setTotpSecret('');
      setVerificationCode('');
    } catch (error: any) {
      console.error('Error verifying MFA:', error);
      toast.error(error.message || 'Código inválido. Tente novamente.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const disableMFA = async () => {
    try {
      setIsEnrolling(true);
      
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      
      if (error) throw error;

      toast.success('2FA desativado');
      setHasMFA(false);
      setFactorId('');
    } catch (error: any) {
      console.error('Error disabling MFA:', error);
      toast.error(error.message || 'Erro ao desativar 2FA');
    } finally {
      setIsEnrolling(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(totpSecret);
    toast.success('Código copiado!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
                <CardDescription>
                  Adicione uma camada extra de segurança à sua conta
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {hasMFA ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    2FA está ativo e protegendo sua conta
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Sua conta está protegida com autenticação de dois fatores. 
                    Você precisará inserir um código do seu aplicativo autenticador 
                    sempre que fizer login.
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={disableMFA}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Desativando...
                    </>
                  ) : (
                    'Desativar 2FA'
                  )}
                </Button>
              </div>
            ) : qrCodeUrl ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Passo 1: Escaneie o QR Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Use um aplicativo autenticador como Google Authenticator ou Authy 
                    para escanear este código:
                  </p>
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                    <img src={qrCodeUrl} alt="QR Code para 2FA" className="w-64 h-64" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Ou insira manualmente:</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      value={totpSecret}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copySecret}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Passo 2: Verificar</h3>
                  <p className="text-sm text-muted-foreground">
                    Insira o código de 6 dígitos gerado pelo aplicativo:
                  </p>
                  <Label htmlFor="verification-code">Código de Verificação</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={verifyAndEnable}
                    disabled={isEnrolling || verificationCode.length !== 6}
                    className="flex-1"
                  >
                    {isEnrolling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      'Verificar e Ativar'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQrCodeUrl('');
                      setTotpSecret('');
                      setVerificationCode('');
                    }}
                    disabled={isEnrolling}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    2FA adiciona segurança extra exigindo um código do seu 
                    aplicativo autenticador além da senha.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h3 className="font-semibold">Como funciona:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Instale um aplicativo autenticador (Google Authenticator, Authy, etc.)</li>
                    <li>Escaneie o QR code que será gerado</li>
                    <li>Insira o código de 6 dígitos para confirmar</li>
                    <li>Use o código do app sempre que fizer login</li>
                  </ol>
                </div>

                <Button
                  onClick={enrollMFA}
                  disabled={isEnrolling}
                  className="w-full"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Configurando...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Ativar 2FA
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
