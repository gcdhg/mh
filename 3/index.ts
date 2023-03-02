/**
 * сохранение логики
 *
 * @returns
 */
function getNews() {
    const app = this.app;
    return Promise.resolve()
        .then(() => app.newsService.getAllNews())
        .then((news) =>
            news
                .reduce(
                    (acc, n) =>
                        acc.then(() =>
                            app.userService
                                .getUser(n.userId)
                                .then((user) => {
                                    n.userName = user ? user.name : "anonimous";
                                    return user ? this.app.starsService.getUserStars(user) : 0;
                                })
                                .then((stars) => {
                                    n.userStars = stars;
                                })
                        ),
                    Promise.resolve()
                )
                .then(() => news)
        );
}

/**
 * сохранение интерфейса
 *
 * @returns
 */
function getNewsV2() {
    const app = this.app;
    return Promise.resolve()
        .then(() => app.newsService.getAllNews())
        .then((news) =>
            Promise.all(
                news.map((n) =>
                    app.userService
                        .getUser(n.userId)
                        .then((user) => {
                            n.userName = user ? user.name : "anonimous";
                            return user ? this.app.starsService.getUserStars(user) : 0;
                        })
                        .then((stars) => {
                            n.userStars = stars;
                        })
                )
            ).then(() => news)
        );
}
