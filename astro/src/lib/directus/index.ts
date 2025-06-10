import { createDirectus, rest, readCollection } from "@directus/sdk"

export type JSONDocument = Record<string, any>;

export type DirectusUser = {
    id: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    contributed_articles: Article[];
    western_name_ordering: boolean;
    email: string;
    avatar: string;
    description: string;
    slug: string;
}

export type Series = {
    id: string;
    title: string;
    simple_description: string;
    content: JSONDocument;
    articles: Article[];
    use_banner: boolean;
    banner_data: JSONDocument
}

export type Article = {
    id: number;
    title: string;
    subtitles: string;
    status: "published" | "draft" | "archived" | "onReview"
    user_created: DirectusUser;
    date_created: Date;
    user_updated: DirectusUser;
    date_updated: Date;
    date_orig?: Date;
    categories: string[];
    keywords: string[];
    series?: Series;
    content: JSONDocument;
    contributors: DirectusUser[];
}

export type Schema = {
    articles: Article[];
    series: Series[];
    directus_users: DirectusUser[];
}

export default createDirectus<Schema>('https://cms.newsniper.org').with(rest());