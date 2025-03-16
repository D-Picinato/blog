import { MetaSchemaType } from '@/schemas/utils/meta';

export default function getPageValues(meta: MetaSchemaType): {
  page: number;
  skip: number;
  take?: number;
} {
  if (!meta.perPage) return { page: 0, skip: 0, take: undefined };

  const page = meta.page || 1;

  return { page, skip: (page - 1) * meta.perPage, take: meta.perPage };
}
