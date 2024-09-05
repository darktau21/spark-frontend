import axios from 'axios';

export const hhApi = axios.create({
  baseURL: 'https://api.hh.ru/',
  timeout: 15 * 1000,
});

type Skill = { id: number; text: string };
type PaginatedResponse<T> = {
  items: T[];
};

export async function searchCompetencies(search: string) {
  try {
    const { data } = await hhApi.get<PaginatedResponse<Skill>>('/suggests/skill_set', {
      params: {
        text: search,
        per_page: 10,
        page: 1,
      },
      headers: {
        'User-Agent': 'SkillsLoader/1.0 (naumenkokirill466@gmail.com)',
      },
    });

    return data.items.map((i) => i.text);
  } catch {
    return [];
  }
}
