export type LanguageCode = 'en-US' | 'vi-VI' | 'ja-JP' | 'fr-FR' | 'de-DE' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ko-KR';

export interface Translations {
  featuredToday: string; welcomeMessage: string; staffPick: string; seeOurPick: string; tvTracker: string;
  whatToWatch: string; topPick: string; topRatedMovie: string; mostPopularTv: string; justForYou: string;
  topRatedTV: string; clearAll: string; noViewedPage: string; streaming: string; checkStatus: string; netFlix: string;
  moreRecommendation: string; editorPick: string, recentlyViewed: string, watchTrailer: string, photos: string,
  genre: string, chart: string, top250Movie: string, voter: string, sortBy: string, details: string,
  ranking: string, rating: string, releaseDay: string, numberRating: string, alphabet: string, popularity: string, runTime: string,
  moreExplore: string, topBoxOffice: string, weekend: string, total: string, advancedSearch: string,
  whatOnTvStream: string, top250Tv: string, watchGuide: string, fanFavorite: string, fromWatchList: string,
  browseCollection: string, director: string, writer: string, star: string, seePro: string, removeFrom: string, reviews: string,
  criticReview: string, upNext: string, episodes: string, storyLine: string, certificate: string, add: string,
  releaseCalendar: string, popularCeleb: string, knowFor: string, born: string, news: string,
  browseMovieByGenre: string, browseTVByGenre: string, latest: string, originals: string, community: string, helpCenter: string,
  contributeZone: string, polls: string, holidayPicks: string, follow: string, getApp: string, os: string, developer: string,
  pressRoom: string, advertise: string, job: string, condition: string, privacy: string, yourAd: string, count: string,
  inTheater: string, inTheaterNearYou: string, inTheaterWithOnlineTicked: string, none: string, options: string,
  fromThePastWeekend: string, asRated: string, createdModified: string, listActivity: string, views: string, thisWeek: string,
  share: string, keyword: string, advanced: string, imdbSearch: string, title: string, expandAll: string, collapseAll: string,
  searchFilter: string,from:string,to:string,orJustEnter:string,votes:string

}

const currentDate = new Date();
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const currentMonth = currentDate.getMonth();
const currentMonthName = monthNames[currentMonth];

export const translations: Record<LanguageCode, Translations> = {
  'en-US': {
    featuredToday: 'Featured today',
    welcomeMessage: 'Welcome to our website',
    staffPick: `Staff Picks: What to Watch in ${currentMonthName}`,
    seeOurPick: 'See our picks',
    tvTracker: 'TV Tracker: Renewed and Canceled Shows',
    whatToWatch: 'What to watch',
    topPick: 'Top picks',
    topRatedMovie: 'Top rated movies',
    mostPopularTv: 'Most popular TV show this week',
    justForYou: 'Just For You',
    topRatedTV: 'Top Rated TV Shows',
    clearAll: 'Clear all',
    noViewedPage: "You have no recently viewed pages",
    streaming: '2024 TV and Streaming Premiere Dates',
    checkStatus: 'Check the status',
    netFlix: `Everything New On Netflix In ${currentMonthName}`,
    moreRecommendation: 'Get more recommendations',
    editorPick: 'Editors picks',
    recentlyViewed: 'Recently viewed',
    watchTrailer: 'What the trailer',
    photos: 'Photos',
    genre: 'Genre',
    chart: 'Charts',
    top250Movie: 'Top250Movie',
    voter: 'As rated by regular IMDb voters.',
    sortBy: 'Sort by',
    ranking: 'Ranking',
    rating: 'Rating',
    releaseDay: 'Release Day',
    numberRating: 'Number Of Rating',
    alphabet: 'Alphabet',
    popularity: 'Popularity',
    runTime: 'RunTime',
    moreExplore: 'More to explore',
    topBoxOffice: 'Top Box Office',
    weekend: 'Weekend',
    total: 'Total',
    advancedSearch: 'Advanced Search',
    whatOnTvStream: 'What on TV & Streaming',
    top250Tv: 'Top 250 TV',
    watchGuide: 'Watch guide',
    fanFavorite: 'Fan Favorite',
    fromWatchList: 'From Your Watchlist',
    browseCollection: 'Browse these IMDb collections to find the perfect next movie or TV show to watch',
    director: 'Director',
    writer: 'Writer',
    star: 'Star',
    seePro: 'See production info at IMDbPro',
    removeFrom: 'Remove from',
    reviews: 'Reviews',
    criticReview: 'Critic Reviews',
    upNext: 'Up next',
    episodes: 'Episodes',
    storyLine: 'Story Line',
    certificate: 'Certificate',
    add: 'Add to',
    releaseCalendar: 'Release calendar',
    popularCeleb: 'Most Popular Celeb',
    knowFor: 'Know for',
    born: 'Born',
    news: 'News',
    browseMovieByGenre: 'Browse movie by genre',
    browseTVByGenre: 'Browse tv by genre',
    latest: 'Latest',
    originals: 'Originals',
    community: 'Community',
    helpCenter: 'Help center',
    contributeZone: 'Contributor zone',
    polls: 'Polls',
    holidayPicks: 'Holiday picks',
    follow: 'Follow IMDb on social',
    getApp: 'Get the IMDb app',
    os: 'For Android and iOS',
    developer: 'Developer',
    pressRoom: 'Press Room',
    advertise: 'Advertising',
    job: 'Jobs',
    condition: 'Conditions of Use',
    privacy: 'Privacy Policy',
    yourAd: 'Your Ads Privacy Choices',
    count: 'Count',
    inTheater: 'In Theater',
    inTheaterNearYou: 'In Theaters Near You',
    inTheaterWithOnlineTicked: 'In Theaters With Online Ticketing',
    options: 'Options',
    none: 'None',
    details: 'Details',
    fromThePastWeekend: 'From the past weekend',
    asRated: 'As rated by regular IMDb voters.',
    createdModified: 'Created 2 weeks ago • Modified 6 days ago',
    listActivity: 'List activity',
    views: 'Views',
    thisWeek: 'This week',
    share: 'Share',
    keyword: 'Keyword',
    advanced: 'Advanced',
    imdbSearch: `Discover IMDb's robust title search. Mix and match info to refine your searches. Looking for 1970s Canadian horror films rated above 6 by at least 100 users? Find them here. All fields below are optional, but at least one title field is needed for a search. For ranges (release date, votes), use 'min' for larger/after and 'max' for smaller/before. To learn more please visit our help site and FAQs.`,
    title: 'Title',
    expandAll: 'Expand All',
    collapseAll: 'Collapse all',
    searchFilter: 'Search filter',
    from:'From',to:'To',
    orJustEnter:'Or just enter',
    votes:'Numbers of votes'
  },
  'vi-VI': {
    featuredToday: 'Nổi bật hôm nay',
    welcomeMessage: 'Chào mừng bạn đến với trang web của chúng tôi',
    staffPick: `Nên xem gì vào tháng ${currentMonth + 1}`,
    seeOurPick: 'Xem lựa chọn của biên tập viên',
    tvTracker: 'Trình theo dõi TV: Các chương trình được gia hạn và hủy bỏ',
    whatToWatch: 'Nên xem gì',
    topPick: 'Lựa chọn hàng đầu',
    topRatedMovie: 'Phim được đánh giá cao nhất',
    mostPopularTv: 'Chương trình TV phổ biến nhất tuần này',
    justForYou: 'Dành cho bạn',
    topRatedTV: 'Chương trình TV được đánh giá cao nhất',
    clearAll: 'Xóa tất cả',
    noViewedPage: 'Bạn không có trang nào đã xem gần đây',
    streaming: 'Ngày công chiếu TV và Streaming 2024',
    checkStatus: 'Kiểm tra trạng thái',
    netFlix: `Mọi thứ mới trên Netflix trong tháng ${currentMonth + 1}`,
    moreRecommendation: 'Xem thêm gợi ý',
    editorPick: 'Gợi ý từ chuyên gia',
    recentlyViewed: 'Đã xem gần đây',
    watchTrailer: 'Xem giới thiệu',
    photos: 'Ảnh',
    genre: 'Thể loại',
    chart: 'Biểu đồ',
    top250Movie: '250 Movie nổi bật',
    voter: 'Được đánh giá bởi người dùng IMDb',
    sortBy: 'Sắp xếp theo',
    ranking: 'Bảng xếp hạng',
    rating: 'Đánh giá',
    releaseDay: 'Ngày phát hành',
    numberRating: 'Số lượng đề cử',
    alphabet: 'Bảng chữ cái',
    popularity: 'Sự nổi tiếng',
    runTime: 'Thời lượng',
    moreExplore: 'Khám phá thêm',
    topBoxOffice: 'Doanh thu hàng đầu',
    weekend: 'Tuần',
    total: 'Tổng',
    advancedSearch: 'Tìm kiếm nâng cao',
    whatOnTvStream: 'Có gì trên TV và Stream',
    top250Tv: '250 TV hàng đầu',
    watchGuide: 'Gợi ý phim',
    fanFavorite: 'Được yêu thích bởi fan',
    fromWatchList: 'Từ Watchlist của bạn',
    browseCollection: 'Chọn bộ sưu tập IMDb sau để tìm movie hoặc tv mà bạn yêu thích',
    director: 'Đạo diễn',
    writer: 'Tác giả',
    star: 'Ngôi sao',
    seePro: 'Đăng kí IMDbPro để xem thêm',
    removeFrom: 'Xóa khỏi',
    reviews: 'Đánh giá',
    criticReview: 'Chỉ trích',
    upNext: 'Kế tiếp',
    episodes: 'Tập phim',
    storyLine: 'Câu truyện',
    certificate: 'Chứng nhận',
    add: 'Thêm vào',
    releaseCalendar: 'Lịch phát sóng',
    popularCeleb: 'Người nổi tiếng',
    knowFor: 'Nổi tiếng với',
    born: 'Ngày ra đời',
    news: 'Tin tức',
    browseMovieByGenre: 'Duyệt Movie theo thể loại',
    browseTVByGenre: 'Duyệt TV theo thể loại',
    latest: 'Mới nhất',
    originals: 'Nguyên bản',
    community: 'Cộng đồng',
    helpCenter: 'Trợ giúp',
    contributeZone: 'Đóng góp cộng đồng',
    polls: 'Thăm dò ý kiến',
    holidayPicks: 'Lựa chọn vào ngày nghỉ',
    follow: 'IMDb trên mạng xã hội',
    getApp: 'Tải ứng dụng',
    os: 'Cho Android và iOS',
    developer: 'Nhà phát triển',
    pressRoom: 'Phòng báo chí',
    advertise: 'Quảng cáo',
    job: 'Việc làm',
    condition: 'Điều khoản sử dụng',
    privacy: 'Chính sách bảo mật',
    yourAd: 'Bảo mật quảng cáo của bạn',
    count: 'Số lượng',
    inTheater: 'Trong rạp phim',
    inTheaterNearYou: 'Rạp phim gần với bạn',
    inTheaterWithOnlineTicked: 'Rạp phim có bán vé trực tuyến',
    options: 'Lựa chọn',
    none: 'Không',
    details: 'Chi tiết',
    fromThePastWeekend: 'Từ cuối tuần trước',
    asRated: 'Được đánh giá bởi những người người dùng IMDb.',
    createdModified: 'Tạo ra 2 tuần trước • Chỉnh sửa lần cuối 6 ngày trước',
    listActivity: 'Lịch hoạt động',
    views: 'Lượt xem',
    thisWeek: 'Tuần này',
    share: 'Chia sẽ',
    keyword: 'Từ khóa',
    advanced: 'Nâng cao',
    imdbSearch: `Khám phá tính năng tìm kiếm tiêu đề mạnh mẽ của IMDb. Trộn và kết hợp thông tin để tinh chỉnh tìm kiếm của bạn. Bạn đang tìm phim kinh dị Canada những năm 1970 được ít nhất 100 người dùng xếp hạng trên 6? Tìm chúng ở đây. Tất cả các trường bên dưới là tùy chọn, nhưng cần có ít nhất một trường tiêu đề để tìm kiếm. Đối với phạm vi (ngày phát hành, phiếu bầu), hãy sử dụng 'min' cho mức lớn hơn/sau và 'max' cho mức nhỏ hơn/trước. Để tìm hiểu thêm, vui lòng truy cập trang trợ giúp và Câu hỏi thường gặp của chúng tôi.`,
    title: 'Tên',
    expandAll: 'Mở hết',
    collapseAll: 'Đóng hết',
    searchFilter: 'Bộ lọc tìm kiếm',
    from:'Từ',to:'Đến',
    orJustEnter:'Hoặc chỉ cần nhập',
    votes:'Số lượng bầu cử'
  },
  'ja-JP': {
    featuredToday: '今日のおすすめ',
    welcomeMessage: '私たちのウェブサイトへようこそ',
    staffPick: `スタッフのおすすめ: ${currentMonth + 1} で見るべきもの`,
    seeOurPick: 'おすすめをみる',
    tvTracker: 'TVトラッカー: 更新およびキャンセルされた番組',
    whatToWatch: '何を見るか',
    topPick: 'トップピック',
    topRatedMovie: '最高評価の映画',
    mostPopularTv: '今週の人気TV番組',
    justForYou: 'あなたのために',
    topRatedTV: '最高評価のTV番組',
    clearAll: 'すべてクリア',
    noViewedPage: '最近表示したページはありません',
    streaming: '2024年のテレビとストリーミングのプレミア日',
    checkStatus: 'ステータスを確認',
    netFlix: `${currentMonth + 1}のNetflixの新着情報`,
    moreRecommendation: 'さらなるおすすめ情報',
    editorPick: 'エディターズ・ピック',
    recentlyViewed: '最近見た',
    watchTrailer: 'トレーラーとは',
    photos: '写真 ',
    genre: 'ジャンル',
    chart: 'チャート',
    top250Movie: 'Top250映画',
    voter: 'IMDbの通常投票者によって評価されました。',
    sortBy: 'ソート方法',
    ranking: 'ランキング',
    rating: '評価',
    releaseDay: '公開日',
    numberRating: '評価数',
    alphabet: 'アルファベット順',
    popularity: '人気',
    runTime: '実行時間',
    moreExplore: '探索するものがもっとあります ',
    topBoxOffice: '興行成績トップ',
    weekend: '週末',
    total: '合計',
    advancedSearch: '高度な検索',
    whatOnTvStream: 'テレビとストリーミングで何があるか ',
    top250Tv: 'トップ250テレビ',
    watchGuide: ' 視聴ガイド',
    fanFavorite: ': ファンのお気に入り',
    fromWatchList: 'あなたのウォッチリストから',
    browseCollection: 'これらのIMDbコレクションをブラウズして、次に見るのに最適な映画やテレビ番組を見つけましょう',
    director: '監督',
    writer: ': 著者',
    star: '俳優',
    seePro: 'MDbProで製作情報を見る',
    removeFrom: 'から削除する',
    reviews: 'レビュー',
    criticReview: '批評家のレビュー',
    upNext: '次に',
    episodes: 'エピソード',
    storyLine: '筋書き',
    certificate: '証明書',
    add: '追加する',
    releaseCalendar: 'リリースカレンダー',
    popularCeleb: '最も人気のある有名人',
    knowFor: 'で知られている',
    born: '生まれた',
    news: 'ニュース',
    browseMovieByGenre: 'ジャンル別に映画を探す',
    browseTVByGenre: 'ジャンル別のTV番組を閲覧する ',
    latest: '最新の',
    originals: 'オリジナル',
    community: 'コミュニティ',
    helpCenter: 'ヘルプセンター',
    contributeZone: '寄稿者ゾーン',
    polls: '投票',
    holidayPicks: 'ホリデーピック',
    follow: ' ソーシャルメディアでIMDb',
    getApp: 'IMDbアプリを入手する',
    os: 'AndroidおよびiOS向け',
    developer: '開発者',
    pressRoom: 'プレスルーム',
    advertise: '広告',
    job: '求人',
    condition: '利用規約',
    privacy: 'プライバシーポリシー',
    yourAd: '広告のプライバシー設定',
    count: '数える',
    inTheater: '劇場で',
    inTheaterNearYou: '近くの劇場で',
    inTheaterWithOnlineTicked: 'オンラインチケットが利用可能な劇場で',
    options: 'オプション',
    none: 'なし',
    details: '詳細',
    fromThePastWeekend: '先週末から',
    asRated: 'IMDbの定期投票者による評価',
    createdModified: '2週間前に作成 • 6日前に変更',
    listActivity: 'リストの活動',
    views: '閲覧数',
    thisWeek: '今週',
    share: '共有する',
    keyword: 'キーワード',
    advanced: '上級',
    imdbSearch: `IMDbの充実したタイトル検索を見つけましょう。情報を組み合わせて検索を絞り込みます。1970年代のカナダのホラー映画で、100人以上のユーザーから6以上の評価を得たものを探していますか？ここで見つけてください。以下のすべてのフィールドは任意ですが、検索には少なくとも1つのタイトルフィールドが必要です。範囲（リリース日、投票数）の場合、「min」は大きい/以降、「max」は小さい/以前を意味します。詳細はヘルプサイトとFAQをご覧ください。`,
    title: 'タイトル',
    expandAll: 'すべて展開',
    collapseAll: 'すべて折りたたむ',
    searchFilter: '検索フィルター',
    from:'から',to:'へ',
    orJustEnter:'または入力してください',
    votes:'投票数'
  },
  'fr-FR': {
    featuredToday: `À la une aujourd\'hui`,
    welcomeMessage: 'Bienvenue sur notre site Web',
    staffPick: `Choix du personnel: ce qu'il faut regarder dans ${currentMonth + 1}`,
    seeOurPick: 'Voir nos choix',
    tvTracker: 'Suivi TV: Émissions renouvelées et annulées',
    whatToWatch: 'Quoi regarder',
    topPick: 'Meilleurs choix',
    topRatedMovie: 'Films les mieux notés',
    mostPopularTv: 'Émission TV la plus populaire de la semaine',
    justForYou: 'Juste pour vous',
    topRatedTV: 'Émissions TV les mieux notées',
    clearAll: 'Tout effacer',
    noViewedPage: 'Vous n\'avez aucune page consultée récemment',
    streaming: 'Dates de première de la TV et du streaming 2024',
    checkStatus: 'Vérifiez le statut',
    netFlix: `Tout nouveau sur Netflix en ${currentMonth + 1}`,
    moreRecommendation: 'Obtenez plus de recommandations',
    editorPick: `Choix de l'éditeur`,
    recentlyViewed: 'Récemment consulté',
    watchTrailer: `Qu'est-ce que la bande-annonce`,
    photos: 'Photos',
    genre: 'Genre',
    chart: 'Charts',
    top250Movie: 'Top250Movie',
    voter: `Évalué par les votants réguliers d'IMDb.`,
    sortBy: `Trier par`,
    ranking: 'Classement',
    rating: `Évaluation`,
    releaseDay: 'Jour de sortie',
    numberRating: `Nombre d'évaluations`,
    alphabet: 'Par ordre alphabétique',
    popularity: 'Popularité',
    runTime: 'Durée',
    moreExplore: 'Plus à explorer',
    topBoxOffice: 'Meilleur box-office',
    weekend: 'Week-end',
    total: 'Total',
    advancedSearch: 'Recherche avancée',
    whatOnTvStream: 'Quoi à la télé et en streaming',
    top250Tv: 'Top 250 TV',
    watchGuide: 'Guide de visionnage',
    fanFavorite: 'Favori des fans',
    fromWatchList: 'De votre liste de surveillance',
    browseCollection: `Parcourez ces collections IMDb pour trouver le film ou l'émission de télévision parfait à regarder ensuite`,
    director: 'Réalisateur',
    writer: 'Écrivain',
    star: 'Acteur',
    seePro: 'Voir les informations de production sur IMDbPro',
    removeFrom: 'Supprimer de',
    reviews: 'Critiques',
    criticReview: 'Critique des critiques',
    upNext: 'À suivre',
    episodes: 'Épisodes',
    storyLine: 'Intrigue',
    certificate: 'Certificat',
    add: 'Ajouter',
    releaseCalendar: 'Calendrier des sorties',
    popularCeleb: 'Célébrités les plus populaires',
    knowFor: 'Connu pour',
    born: 'Né(e)',
    news: 'Nouvelles',
    browseMovieByGenre: 'Parcourir les films par genre',
    browseTVByGenre: 'Parcourir la télévision par genre',
    latest: 'Dernier ',
    originals: 'Originaux',
    community: 'Communauté',
    helpCenter: `Centre d'aide`,
    contributeZone: 'Zone des contributeurs',
    polls: 'Sondages',
    holidayPicks: 'Sélections de vacances',
    follow: 'Suivez IMDb sur les réseaux sociaux',
    getApp: `Téléchargez l'application IMDb`,
    os: 'Pour Android et iOS',
    developer: 'Développeur',
    pressRoom: 'Salle de presse',
    advertise: 'Publicité',
    job: 'Emplois',
    condition: `Conditions d'utilisation`,
    privacy: 'Politique de confidentialité',
    yourAd: 'Vos choix de confidentialité pour les publicités',
    count: 'Compter',
    inTheater: 'En salle',
    inTheaterNearYou: 'Dans les salles près de chez vous',
    inTheaterWithOnlineTicked: 'Dans les cinémas avec réservation en ligne',
    options: 'Options',
    none: 'Aucun',
    details: 'Détails',
    fromThePastWeekend: 'Depuis le week-end dernier',
    asRated: `Noté par les votants réguliers d'IMDb`,
    createdModified: 'Créé il y a 2 semaines • Modifié il y a 6 jours',
    listActivity: 'Activité de la liste',
    views: 'Vues',
    thisWeek: 'Cette semaine',
    share: 'Partager',
    keyword: 'Mot-clé',
    advanced: 'Avancé',
    imdbSearch: `Découvrez la recherche de titres robuste d'IMDb. Mélangez et associez les informations pour affiner vos recherches. Vous recherchez des films d'horreur canadiens des années 1970 notés au-dessus de 6 par au moins 100 utilisateurs ? Trouvez-les ici. Tous les champs ci-dessous sont facultatifs, mais au moins un champ de titre est nécessaire pour une recherche. Pour les plages (date de sortie, votes), utilisez 'min' pour plus grand/après et 'max' pour plus petit/avant. Pour en savoir plus, veuillez visiter notre site d'aide et nos FAQ.`,
    title: 'Titre',
    expandAll: 'Tout développer',
    collapseAll: 'Réduire tout',
    searchFilter: 'Filtres de recherche',
    from:'De',to:'À',
    orJustEnter:'Ou entrez simplement',
    votes:'Nombre de votes'
  },

  'de-DE': {
    featuredToday: 'Heute im Fokus',
    welcomeMessage: 'Willkommen auf unserer Website',
    staffPick: `Empfehlungen der Redaktion: Was Sie im ${currentMonth + 1} sehen sollten`,
    seeOurPick: 'Siehe unsere Auswahl',
    tvTracker: 'TV-Tracker: Erneuerte und abgesetzte Shows',
    whatToWatch: 'Was zu sehen',
    topPick: 'Top-Auswahl',
    topRatedMovie: 'Top-bewertete Filme',
    mostPopularTv: 'Beliebteste TV-Show dieser Woche',
    justForYou: 'Nur für dich',
    topRatedTV: 'Top-bewertete TV-Sendungen',
    clearAll: 'Alles löschen',
    noViewedPage: 'Sie haben keine kürzlich angesehenen Seiten',
    streaming: '2024 TV- und Streaming-Premierendaten',
    checkStatus: 'Status überprüfen',
    netFlix: `Alles Neue auf Netflix im ${currentMonth + 1}`,
    moreRecommendation: 'Weitere Empfehlungen erhalten',
    editorPick: 'Redakteurfavoriten',
    recentlyViewed: 'Kürzlich angesehen',
    watchTrailer: 'Was ist der Trailer',
    photos: 'Fotos',
    genre: 'Genre',
    chart: 'Charts',
    top250Movie: 'Top250Movie',
    voter: `Bewertet von regulären IMDb-Wählern.`,
    sortBy: 'Sortieren nach',
    ranking: 'Rangliste',
    rating: 'Bewertung',
    releaseDay: `Veröffentlichungstag`,
    numberRating: 'Anzahl der Bewertungen',
    alphabet: 'Alphabetisch',
    popularity: 'Beliebtheit',
    runTime: 'Laufzei',
    moreExplore: 'Mehr zu entdecken',
    topBoxOffice: 'Spitzenreiter an den Kinokassen',
    weekend: 'Wochenende',
    total: 'Gesamt',
    advancedSearch: 'Erweiterte Suche',
    whatOnTvStream: 'Was läuft im TV & Streaming',
    top250Tv: 'Top 250 TV',
    watchGuide: 'Sehführer',
    fanFavorite: 'Fanliebling',
    fromWatchList: 'Von deiner Watchlist',
    browseCollection: 'Durchstöbern Sie diese IMDb-Sammlungen, um den perfekten nächsten Film oder die perfekte nächste TV-Show zu finden',
    director: 'Regisseur',
    writer: 'Schriftsteller',
    star: 'Schauspieler',
    seePro: 'Produktionsinformationen auf IMDbPro anzeigen',
    removeFrom: 'Entfernen aus',
    reviews: 'Bewertungen',
    criticReview: 'Kritikerbewertung',
    upNext: 'Als Nächstes',
    episodes: 'Episoden',
    storyLine: 'Handlung',
    certificate: 'Zertifikat',
    add: 'Hinzufügen',
    releaseCalendar: 'Veröffentlichungskalender',
    popularCeleb: 'Beliebteste Prominente',
    knowFor: 'Bekannt für',
    born: 'Geboren',
    news: 'Nachrichten',
    browseMovieByGenre: 'Filme nach Genre durchsuchen',
    browseTVByGenre: 'Fernsehen nach Genre durchsuchen',
    latest: 'Neueste',
    originals: 'Originale',
    community: 'Gemeinschaft',
    helpCenter: 'Hilfezentrum',
    contributeZone: 'Bereich ,für Beitragende',
    polls: 'Umfragen',
    holidayPicks: 'Urlaubstipps',
    follow: 'Folgen Sie IMDb in den sozialen Medien',
    getApp: 'Holen Sie sich die IMDb-App',
    os: 'Für Android und iOS',
    developer: 'Entwickler',
    pressRoom: 'Pressezimmer',
    advertise: 'Werbung',
    job: 'Stellenangebote',
    condition: 'Nutzungsbedingungen',
    privacy: 'Datenschutzrichtlinie',
    yourAd: 'Ihre Datenschutzoptionen für Werbung',
    count: 'Zählen',
    inTheater: 'Im Kino',
    inTheaterNearYou: 'In Kinos in Ihrer Nähe',
    inTheaterWithOnlineTicked: 'In Kinos mit Online-Ticketing',
    options: 'Optionen',
    none: 'Keine',
    details: 'Details',
    fromThePastWeekend: 'Seit dem letzten Wochenende',
    asRated: 'Bewertet von regelmäßigen IMDb-Wählern',
    createdModified: 'Vor 2 Wochen erstellt • Vor 6 Tagen bearbeitet',
    listActivity: 'Listenaktivität',
    views: 'Ansichten',
    thisWeek: 'Diese Woche',
    share: 'Teilen',
    keyword: 'Schlüsselwort',
    advanced: 'Fortgeschritten',
    imdbSearch: `Entdecken Sie die leistungsstarke Titelsuche von IMDb. Mischen und kombinieren Sie Informationen, um Ihre Suche zu verfeinern. Sie suchen nach kanadischen Horrorfilmen aus den 1970er Jahren, die von mindestens 100 Nutzern mit über 6 bewertet wurden? Finden Sie sie hier. Alle Felder unten sind optional, aber für eine Suche wird mindestens ein Titelfeld benötigt. Für Bereiche (Veröffentlichungsdatum, Stimmen) verwenden Sie 'min' für größer/nach und 'max' für kleiner/vor. Um mehr zu erfahren, besuchen Sie bitte unsere Hilfeseite und FAQs.`,
    title: 'Titel',
    expandAll: 'Alle erweitern',
    collapseAll: 'Alle einklappen',
    searchFilter: 'Suchfilter',
    from:'Von',to:'Zu',
    orJustEnter:'Oder einfach eingeben',
    votes:'Anzahl der Stimmen'

  },
  'hi-IN': {
    featuredToday: 'आज का प्रमुख',
    welcomeMessage: 'हमारी वेबसाइट पर आपका स्वागत है',
    staffPick: `स्टाफ़ की पसंद: ${currentMonth + 1} में क्या देखना है`,
    seeOurPick: 'हमारी पसंद देखें',
    tvTracker: 'टीवी ट्रैकर: नवीनीकृत और रद्द शो',
    whatToWatch: 'क्या देखना है',
    topPick: 'सर्वोत्तम चयन',
    topRatedMovie: 'सर्वोच्च रेटेड फिल्में',
    mostPopularTv: 'इस सप्ताह का सबसे लोकप्रिय टीवी शो',
    justForYou: 'आपके लिए खास',
    topRatedTV: 'सर्वोच्च रेटेड टीवी शो',
    clearAll: 'सब साफ करें',
    noViewedPage: 'आपने हाल ही में कोई पेज नहीं देखा है',
    streaming: '2024 टीवी और स्ट्रीमिंग प्रीमियर की तारीखें',
    checkStatus: 'स्थिति जांचें',
    netFlix: `${currentMonth + 1} में नेटफ्लिक्स पर सब कुछ नया`,
    moreRecommendation: 'अधिक अनुशंसाएं प्राप्त करें',
    editorPick: 'संपादक की पसंद',
    recentlyViewed: ' हाल ही में देखा गया',
    watchTrailer: 'ट्रेलर क्या है',
    photos: 'फ़ोटो',
    genre: 'शैली',
    chart: 'चार्ट्स',
    top250Movie: ' शीर्ष250फिल्म',
    voter: 'IMDb के नियमित मतदाताओं द्वारा मूल्यांकित।',
    sortBy: 'क्रमबद्ध करें',
    ranking: 'रैंकिंग',
    rating: 'मूल्यांकन',
    releaseDay: 'रिलीज़ दिन',
    numberRating: 'मूल्यांकनों की संख्या',
    alphabet: 'वर्णमाला के क्रम में',
    popularity: 'लोकप्रियता',
    runTime: 'रनटाइम',
    moreExplore: 'और अन्वेषण करना',
    topBoxOffice: ' शीर्ष बॉक्स ऑफिस ',
    weekend: 'सप्ताहांत',
    total: 'कुल',
    advancedSearch: 'उन्नत खोज',
    whatOnTvStream: 'टीवी और स्ट्रीमिंग पर क्या है',
    top250Tv: 'शीर्ष 250 टीवी',
    watchGuide: ' देखने की गाइड ',
    fanFavorite: 'प्रशंसकों का पसंदीदा',
    fromWatchList: 'आपकी वॉचलिस्ट से ',
    browseCollection: 'इन IMDb संग्रहों को ब्राउज़ करें और देखने के लिए अगली सर्वश्रेष्ठ फ़िल्म या टीवी शो खोजें',
    director: 'निर्देशक',
    writer: 'लेखक',
    star: 'स्टार',
    seePro: 'IMDbPro पर उत्पादन सूचना देखें',
    removeFrom: 'से हटाएँ ',
    reviews: 'समीक्षाएँ',
    criticReview: ' प्रमुख समीक्षा',
    upNext: 'अगला',
    episodes: 'एपिसोड',
    storyLine: 'कहानी',
    certificate: 'प्रमाणपत्र',
    add: 'जोड़ें',
    releaseCalendar: 'रिलीज़ कैलेंडर',
    popularCeleb: 'सबसे लोकप्रिय हस्तियाँ',
    knowFor: 'के लिए जाना जाता है',
    born: 'जन्म',
    news: 'समाचार',
    browseMovieByGenre: 'शैलियों के अनुसार फ़िल्में ब्राउज़ करें',
    browseTVByGenre: 'शैली के अनुसार टीवी ब्राउज़ करें ',
    latest: 'नवीनतम',
    originals: 'मूल',
    community: 'समुदाय',
    helpCenter: 'सहायता केंद्र',
    contributeZone: 'योगदानकर्ता क्षेत्र',
    polls: 'मतदान',
    holidayPicks: 'छुट्टी की पसंद',
    follow: 'सोशल मीडिया पर IMDb को फॉलो करें',
    getApp: 'IMDb ऐप प्राप्त करें',
    os: `Android और iOS के लिए`,
    developer: 'डेवलपर',
    pressRoom: 'प्रेस रूम',
    advertise: 'विज्ञापन',
    job: 'नौकरियां',
    condition: 'उपयोग की शर्तें',
    privacy: 'गोपनीयता नीति ',
    yourAd: 'आपके विज्ञापनों की गोपनीयता विकल्प',
    count: 'गिनती',
    inTheater: 'थिएटर में',
    inTheaterNearYou: 'आपके नजदीकी थिएटर में',
    inTheaterWithOnlineTicked: 'ऑनलाइन टिकटिंग वाले थिएटर में',
    options: 'विकल्प',
    none: 'कोई नहीं',
    details: 'विवरण',
    fromThePastWeekend: 'पिछले सप्ताह के वीकएंड से ',
    asRated: 'IMDb के नियमित मतदाताओं द्वारा रेट किया गया',
    createdModified: '2 सप्ताह पहले बनाया गया • 6 दिन पहले संशोधित किया गया',
    listActivity: 'सूची गतिविधि',
    views: 'दृश्य',
    thisWeek: 'इस हफ्ते',
    share: 'साझा करें',
    keyword: 'कुंजी शब्द',
    advanced: 'उन्नत',
    imdbSearch: `IMDb की मजबूत शीर्षक खोज का अन्वेषण करें। अपनी खोजों को परिष्कृत करने के लिए जानकारी मिलाएं और मिलाएं। 1970 के दशक की कनाडाई हॉरर फिल्मों को खोज रहे हैं जो कम से कम 100 उपयोगकर्ताओं द्वारा 6 से अधिक रेट की गई हैं? उन्हें यहाँ खोजें। नीचे सभी फ़ील्ड वैकल्पिक हैं, लेकिन खोज के लिए कम से कम एक शीर्षक फ़ील्ड की आवश्यकता होती है। रेंज (रिलीज़ तिथि, वोट) के लिए, 'min' का उपयोग बड़े/बाद में और 'max' का उपयोग छोटे/पहले के लिए करें। अधिक जानने के लिए कृपया हमारी सहायता साइट और FAQ पर जाएँ।`,
    title: 'शीर्षक',
    expandAll: 'सभी विस्तृत करें',
    collapseAll: 'सभी संक्षिप्त करें',
    searchFilter: 'खोज फ़िल्टर',
    from:'से',to:'को',
    orJustEnter:'या बस दर्ज करें',
    votes:'मतों की संख्या'

  },
  'id-ID': {
    featuredToday: 'Unggulan hari ini',
    welcomeMessage: 'Selamat datang di situs kami',
    staffPick: `Pilihan Staf: Yang Harus Ditonton di ${currentMonth + 1}`,
    seeOurPick: 'Lihat pilihan kami',
    tvTracker: 'Pelacak TV: Acara yang Diperbarui dan Dibatalkan',
    whatToWatch: 'Apa yang harus ditonton',
    topPick: 'Pilihan teratas',
    topRatedMovie: 'Film dengan rating tertinggi',
    mostPopularTv: 'Acara TV paling populer minggu ini',
    justForYou: 'Hanya untukmu',
    topRatedTV: 'Acara TV dengan rating tertinggi',
    clearAll: 'Bersihkan semua',
    noViewedPage: 'Anda tidak memiliki halaman yang baru dilihat',
    streaming: 'Tanggal Perdana TV dan Streaming 2024',
    checkStatus: 'Cek status',
    netFlix: `Semua yang Baru di Netflix di ${currentMonth + 1}`,
    moreRecommendation: 'Dapatkan lebih banyak rekomendasi',
    editorPick: 'Pilihan Editor',
    recentlyViewed: 'Baru saja dilihat',
    watchTrailer: 'Apa itu trailer',
    photos: 'Foto',
    genre: 'Genre',
    chart: 'Charts',
    top250Movie: 'MovieTop250',
    voter: 'Dinilai oleh pemilih reguler IMDb.',
    sortBy: 'Urutkan berdasarkan',
    ranking: 'Peringkat',
    rating: 'Penilaian',
    releaseDay: 'Hari rilis',
    numberRating: 'Jumlah penilaian',
    alphabet: 'Secara alfabetis',
    popularity: 'Popularitas',
    runTime: 'Durasi',
    moreExplore: 'Lebih untuk dijelajahi',
    topBoxOffice: 'Peringkat teratas box office',
    weekend: 'Akhir pekan',
    total: 'Total',
    advancedSearch: 'Pencarian Lanjutan',
    whatOnTvStream: 'Apa yang ada di TV & Streaming',
    top250Tv: 'Top 250 TV',
    watchGuide: 'Panduan menonton',
    fanFavorite: 'Favorit penggemar',
    fromWatchList: 'Dari daftar tontonan Anda',
    browseCollection: 'Jelajahi koleksi IMDb ini untuk menemukan film atau acara TV sempurna berikutnya untuk ditonton',
    director: 'Sutradara',
    writer: 'Penulis',
    star: 'Bintang',
    seePro: 'Lihat informasi produksi di IMDbPro',
    removeFrom: 'Hapus dari',
    reviews: 'Ulasan',
    criticReview: 'Ulasan kritikus',
    upNext: 'Selanjutnya',
    episodes: 'Episode',
    storyLine: 'Alur cerita',
    certificate: 'Sertifikat',
    add: 'Tambahkan',
    releaseCalendar: 'Kalender Rilis',
    popularCeleb: 'Selebriti Terpopuler',
    knowFor: 'Dikenal untuk',
    born: 'Lahir',
    news: 'Berita',
    browseMovieByGenre: 'Jelajahi film berdasarkan genre',
    browseTVByGenre: 'Jelajahi acara TV berdasarkan genre',
    latest: 'Terbaru',
    originals: 'Asli',
    community: 'Komunitas',
    helpCenter: 'Pusat Bantuan',
    contributeZone: 'Zona Kontributor',
    polls: 'Jajak pendapat',
    holidayPicks: 'Pilihan liburan',
    follow: 'Ikuti IMDb di media sosial',
    getApp: 'Dapatkan aplikasi IMDb',
    os: 'Untuk Android dan iOS',
    developer: 'Pengembang',
    pressRoom: 'Ruang Pers',
    advertise: 'Periklanan',
    job: 'Pekerjaan',
    condition: 'Syarat Penggunaan',
    privacy: 'Kebijakan Privasi',
    yourAd: 'Pilihan Privasi Iklan Anda',
    count: 'Menghitung',
    inTheater: 'Sedang diputar di bioskop',
    inTheaterNearYou: 'Di bioskop di dekat Anda',
    inTheaterWithOnlineTicked: 'Di bioskop dengan pemesanan tiket online',
    options: 'Pilihan',
    none: 'Tidak ada',
    details: 'Detail',
    fromThePastWeekend: 'Dari akhir pekan kemarin',
    asRated: 'Seperti yang dinilai oleh pemilih reguler IMDb',
    createdModified: 'Dibuat 2 minggu yang lalu • Diubah 6 hari yang lalu',
    listActivity: 'Aktivitas Daftar',
    views: 'Tayangan',
    thisWeek: 'Minggu ini',
    share: 'Bagikan',
    keyword: 'Kata kunci',
    advanced: 'Lanjutan',
    imdbSearch: `Temukan pencarian judul yang kuat dari IMDb. Campur dan sesuaikan informasi untuk mempersempit pencarian Anda. Mencari film horor Kanada tahun 1970-an yang diberi nilai di atas 6 oleh setidaknya 100 pengguna? Temukan mereka di sini. Semua bidang di bawah ini bersifat opsional, tetapi setidaknya satu bidang judul diperlukan untuk pencarian. Untuk rentang (tanggal rilis, suara), gunakan 'min' untuk lebih besar/setelah dan 'max' untuk lebih kecil/sebelum. Untuk mempelajari lebih lanjut, silakan kunjungi situs bantuan dan FAQ kami.`,
    title: 'Judul',
    expandAll: 'Perluas semua',
    collapseAll: 'Tutup semua',
    searchFilter: 'Filter pencarian',
    from:'Dari',to:'Ke',
    orJustEnter:'Atau masukkan saja',
    votes:'Jumlah suara'
  },
  'it-IT': {
    featuredToday: 'In primo piano oggi',
    welcomeMessage: 'Benvenuti nel nostro sito web',
    staffPick: `Scelte dello staff: cosa guardare in ${currentMonth + 1}`,
    seeOurPick: 'Vedi le nostre scelte',
    tvTracker: 'TV Tracker: Spettacoli rinnovati e cancellati',
    whatToWatch: 'Cosa guardare',
    topPick: 'Scelte migliori',
    topRatedMovie: 'Film più votati',
    mostPopularTv: 'Lo spettacolo TV più popolare di questa settimana',
    justForYou: 'Solo per te',
    topRatedTV: 'Programmi TV più votati',
    clearAll: 'Cancella tutto',
    noViewedPage: 'Non hai pagine visualizzate di recente',
    streaming: 'Date di anteprima TV e streaming 2024',
    checkStatus: 'Controlla lo stato',
    netFlix: `Tutte le novità su Netflix in ${currentMonth + 1}`,
    moreRecommendation: 'Ottieni più consigli',
    editorPick: `Scelti dall'editore`,
    recentlyViewed: 'Visualizzati di recente',
    watchTrailer: `Cos'è il trailer`,
    photos: 'Foto',
    genre: 'Genene',
    chart: 'Classifiche',
    top250Movie: 'Top250Movie',
    voter: 'Valutato dai votanti regolari di IMDb.',
    sortBy: 'Ordina per',
    ranking: 'Classifica',
    rating: 'Valutazione',
    releaseDay: 'Giorno di uscita',
    numberRating: 'Numero di valutazioni',
    alphabet: 'In ordine alfabetico',
    popularity: 'Popolarità',
    runTime: 'Durata',
    moreExplore: 'Altro da esplorare',
    topBoxOffice: 'n cima al botteghino',
    weekend: 'Weekend',
    total: 'Totale',
    advancedSearch: 'Ricerca avanzata',
    whatOnTvStream: `Cosa c'è in TV e in streaming`,
    top250Tv: 'Top 250 TV',
    watchGuide: 'Guida alla visione',
    fanFavorite: 'Preferito dai fan',
    fromWatchList: 'Dalla tua lista di osservazione',
    browseCollection: 'Sfoglia queste collezioni di IMDb per trovare il film o la serie TV perfetta da guardare',
    director: 'Regista',
    writer: 'Scrittore',
    star: 'Attore',
    seePro: 'Visualizza le informazioni di produzione su IMDbPro',
    removeFrom: 'Rimuovi da',
    reviews: 'Recensioni',
    criticReview: 'Recensione critica',
    upNext: 'Prossimo',
    episodes: 'Episodi',
    storyLine: 'Trama',
    certificate: 'Certificato',
    add: 'Aggiungere',
    releaseCalendar: 'Calendario delle uscite',
    popularCeleb: 'Celebrità più popolari',
    knowFor: 'Conosciuto per',
    born: 'Nato(a)',
    news: 'Notizie',
    browseMovieByGenre: 'Sfoglia i film per genere',
    browseTVByGenre: 'Sfoglia la TV per genere',
    latest: 'Ultimo',
    originals: 'Originali',
    community: 'Comunità',
    helpCenter: 'Centro assistenza',
    contributeZone: 'Zona dei contributori',
    polls: 'Sondaggi',
    holidayPicks: 'Scelte per le vacanze',
    follow: 'Segui IMDb sui social',
    getApp: `Scarica l'app di IMDb`,
    os: 'Per Android e iOS',
    developer: 'Sviluppatore',
    pressRoom: 'Sala stampa',
    advertise: 'Pubblicità',
    job: 'Lavori',
    condition: `Condizioni d'uso`,
    privacy: 'Informativa sulla privacy',
    yourAd: 'Le tue scelte sulla privacy degli annunci',
    count: 'Contare',
    inTheater: 'Al cinema',
    inTheaterNearYou: 'Nei cinema vicino a te',
    inTheaterWithOnlineTicked: 'Nei cinema con prenotazione online',
    options: 'Opzioni',
    none: 'Nessuno',
    details: 'Dettagli',
    fromThePastWeekend: 'Dal fine settimana scorso',
    asRated: 'Valutato dai votanti regolari di IMDb',
    createdModified: 'Creato 2 settimane fa • Modificato 6 giorni fa',
    listActivity: 'Attività della lista',
    views: 'Visualizzazioni',
    thisWeek: 'Questa settimana',
    share: 'Condividere',
    keyword: 'Parola chiave',
    advanced: 'Avanzato',
    imdbSearch: `Scopri la potente ricerca per titolo di IMDb. Mescola e abbina le informazioni per affinare le tue ricerche. Cerchi film horror canadesi degli anni '70 valutati sopra 6 da almeno 100 utenti? Trovali qui. Tutti i campi sottostanti sono opzionali, ma è necessario almeno un campo del titolo per una ricerca. Per intervalli (data di rilascio, voti), usa 'min' per maggiore/dopo e 'max' per minore/prima. Per saperne di più, visita il nostro sito di aiuto e le FAQ.`,
    title: 'Titolo',
    expandAll: 'Espandi tutto',
    collapseAll: 'Comprimi tutto',
    searchFilter: 'Filtri di ricerca',
    from:'Da',to:'A',
    orJustEnter:'O semplicemente inserisci',
    votes:'Numero di vot'

  },
  'ko-KR': {
    featuredToday: '오늘의 추천',
    welcomeMessage: '우리 웹사이트에 오신 것을 환영합니다',
    staffPick: `직원 추천: ${currentMonth + 1}에 볼만한 동영상`,
    seeOurPick: '우리의 선택 보기',
    tvTracker: 'TV 추적기: 갱신 및 취소된 프로그램',
    whatToWatch: '무엇을 볼까',
    topPick: '최고의 선택',
    topRatedMovie: '최고 평점을 받은 영화',
    mostPopularTv: '이번 주 가장 인기 있는 TV 쇼',
    justForYou: '당신을 위해',
    topRatedTV: '최고 평점을 받은 TV 프로그램',
    clearAll: '모두 지우기',
    noViewedPage: '최근에 본 페이지가 없습니다',
    streaming: '2024년 TV 및 스트리밍 첫 방송 날짜',
    checkStatus: '상태 확인',
    netFlix: `${currentMonth + 1}에 넷플릭스에서 새로 나온 모든 것`,
    moreRecommendation: '더 많은 추천 받기',
    editorPick: '편집자 추천',
    recentlyViewed: ' 최근 본',
    watchTrailer: '트레일러란 무엇인가',
    photos: '사진',
    genre: '장르',
    chart: '차트',
    top250Movie: 'Top250영화',
    voter: 'IMDb 정기 투표자들의 평가에 따라',
    sortBy: '정렬 기준',
    ranking: '순위',
    rating: '평가',
    releaseDay: '공개일',
    numberRating: '평가 수',
    alphabet: '알파벳 순서대로',
    popularity: '인기',
    runTime: '실행 시간',
    moreExplore: '더 탐험할 것이 있습니다',
    topBoxOffice: '박스 오피스 1위',
    weekend: '주말',
    total: ' 총 ',
    advancedSearch: '고급 검색',
    whatOnTvStream: 'TV 및 스트리밍에서 무엇이 나오나요',
    top250Tv: '탑 250 TV',
    watchGuide: '시청 가이드',
    fanFavorite: '팬이 좋아하는',
    fromWatchList: '당신의 시청 목록에서',
    browseCollection: '다음에 볼 완벽한 영화나 TV 프로그램을 찾기 위해 이 IMDb 컬렉션을 탐색하세요 ',
    director: '감독',
    writer: '작가',
    star: '스타',
    seePro: 'IMDbPro에서 제작 정보 보기',
    removeFrom: '에서 제거하기',
    reviews: '리뷰',
    criticReview: '비평가 리뷰',
    upNext: '다음',
    episodes: '에피소드',
    storyLine: '스토리라인',
    certificate: '인증서',
    add: ': 추가하다 ',
    releaseCalendar: '출시 일정',
    popularCeleb: '가장 인기 있는 유명인 ',
    knowFor: '로 유명한',
    born: '태어난',
    news: '뉴스',
    browseMovieByGenre: '장르별로 영화 검색',
    browseTVByGenre: '장르별 TV 프로그램 검색하기',
    latest: '최신',
    originals: '오리지널',
    community: '커뮤니티',
    helpCenter: '도움 센터',
    contributeZone: '기고자 존',
    polls: '투표',
    holidayPicks: '휴가 추천',
    follow: '소셜 미디어에서 IMDb 팔로우하기',
    getApp: 'IMDb 앱 다운로드',
    os: 'Android 및 iOS용',
    developer: '개발자',
    pressRoom: '언론실',
    advertise: '광고',
    job: '채용',
    condition: '이용 약관',
    privacy: '개인정보 보호정책',
    yourAd: '광고 개인정보 선택',
    count: '세다',
    inTheater: '영화관에서',
    inTheaterNearYou: '근처 극장에서 상영 중',
    inTheaterWithOnlineTicked: '온라인 티켓팅을 제공하는 극장에서',
    options: '옵션',
    none: '없음',
    details: '세부 사항',
    fromThePastWeekend: '지난 주말부터',
    asRated: '정규 IMDb 투표자들의 평가에 따라',
    createdModified: '2주 전에 생성됨 • 6일 전에 수정됨',
    listActivity: '목록 활동',
    views: '조회수',
    thisWeek: '이번 주',
    share: '공유하다',
    keyword: '키워드',
    advanced: '고급',
    imdbSearch: `IMDb의 강력한 타이틀 검색을 발견하세요. 정보를 조합하여 검색을 세분화하세요. 1970년대 캐나다 호러 영화 중 100명 이상의 사용자로부터 6점 이상 평가를 받은 영화를 찾으시나요? 여기에서 찾으세요. 아래 모든 필드는 선택 사항이지만 검색을 위해서는 최소한 하나의 제목 필드가 필요합니다. 범위(출시 날짜, 투표)에서는 'min'을 더 큰/이후, 'max'를 더 작은/이전에 사용합니다. 자세한 내용은 도움말 사이트 및 FAQ를 방문하십시오.`,
    title: '제목',
    expandAll: '모두 확장',
    collapseAll: '모두 접기',
    searchFilter:'검색 필터',
    from:'~에서',to:'~에',
    orJustEnter:'또는 입력하세요',
    votes:'투표 수'

  },
};
