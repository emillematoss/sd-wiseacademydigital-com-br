// Preencha com os dados reais. Vazio = mostra aviso ao clicar.
export const SITE = {
  checkoutUrl: "",
  whatsappUrl: "",
  email: "",
  termsUrl: "",
  privacyUrl: "",
  instagramUrl: "https://instagram.com/emillematos_",
  metaPixelId: "",
};

export function trackCheckout() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  if (SITE.metaPixelId && w.fbq) w.fbq("track", "InitiateCheckout");
}
