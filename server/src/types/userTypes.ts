export type UserProfile = {
    userId: string
    name: string
    email: string
    password: string
    bio: string
    avatarUrl?: string
    coverUrl?: string
    interests: string[]
}