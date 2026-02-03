const worksModules = import.meta.glob('../content/works/*.json', { eager: true });
const pagesModules = import.meta.glob('../content/pages/*.json', { eager: true });
const advertisementsModules = import.meta.glob('../content/advertisements/*.json', { eager: true });
const announcementsModules = import.meta.glob('../content/announcements/*.json', { eager: true });

interface ContentItem {
  [key: string]: any;
}

function extractFileName(path: string): string {
  return path.split('/').pop()?.replace('.json', '') || '';
}

export const loadAllWorks = (): ContentItem[] => {
  const works = Object.entries(worksModules).map(([path, module]: [string, any]) => ({
    id: extractFileName(path),
    ...module.default,
  }));
  return works.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const loadWork = async (id: string): Promise<ContentItem | null> => {
  try {
    const module = await import(`../content/works/${id}.json`);
    return { id, ...module.default };
  } catch (error) {
    console.error(`Error loading work ${id}:`, error);
    return null;
  }
};

export const loadAllAdvertisements = (): ContentItem[] => {
  const ads = Object.entries(advertisementsModules).map(([path, module]: [string, any]) => ({
    id: extractFileName(path),
    ...module.default,
  }));
  return ads.filter((ad) => ad.active).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const loadAllAnnouncements = (): ContentItem[] => {
  const announcements = Object.entries(announcementsModules).map(([path, module]: [string, any]) => ({
    id: extractFileName(path),
    ...module.default,
  }));
  return announcements.filter((ann) => ann.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const loadPage = async (pageName: 'home' | 'about' | 'legal'): Promise<ContentItem | null> => {
  try {
    const module = await import(`../content/pages/${pageName}.json`);
    return module.default;
  } catch (error) {
    console.error(`Error loading page ${pageName}:`, error);
    return null;
  }
};

export const loadHomePage = async () => loadPage('home');
export const loadAboutPage = async () => loadPage('about');
export const loadLegalPage = async () => loadPage('legal');
