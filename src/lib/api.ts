export async function configureOpenApiAuth(
  getToken: () => Promise<string | undefined>
): Promise<void> {
  try {
    const mod: any = await import('../api');
    if (mod?.OpenAPI) {
      if (import.meta.env.VITE_API_BASE_URL) {
        mod.OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;
      }
      mod.OpenAPI.TOKEN = async () => {
        try {
          return await getToken();
        } catch {
          return undefined;
        }
      };
    }
  } catch {
    // API не сгенерирован — пропускаем
  }
}


