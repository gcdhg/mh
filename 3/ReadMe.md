Переписать функцию не используя await (promise only)

```typescript
async getNews() {
    const news = await this.app.newsService.getAllNews()
    for (const n of news) {
        const user = await this.app.userService.getUser(n.userId)
        n.userName = user ? user.name : 'anonimous'
        n.userStars = user ? await this.app.starsService.getUserStars(user) : 0
    }
    return news
}
```
