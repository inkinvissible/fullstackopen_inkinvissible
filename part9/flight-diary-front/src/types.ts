export interface Entry {
    id: string,
    date: string,
    weather: string,
    visibility: string,
    comment?: string
}

export type NewEntry = Omit<Entry, 'id'>