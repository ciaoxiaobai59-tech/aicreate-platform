// API基础URL
const API_BASE = '';

// 用户存储（使用localStorage模拟数据库）
const USER_STORAGE_KEY = 'aicreate_users';

// 获取所有用户
function getUsers() {
    const users = localStorage.getItem(USER_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

// 保存用户
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

// 检查邮箱是否已存在
function isEmailExists(email) {
    const users = getUsers();
    return users.some(u => u.email === email);
}

// 检查用户名是否已存在
function isUsernameExists(username) {
    const users = getUsers();
    return users.some(u => u.username === username);
}

// 根据邮箱查找用户
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Mock数据
function loadMockData() {
    // 从localStorage加载用户发布的作品
    const savedArtworks = JSON.parse(localStorage.getItem('aicreate_artworks') || '[]');
    const savedWorkflows = JSON.parse(localStorage.getItem('aicreate_workflows') || '[]');
    
    return {
        workflows: [
            { id: '1', title: 'AI艺术风格转换', description: '将照片转换为多种艺术风格，包括油画、水彩、素描等', cover_image: 'https://picsum.photos/seed/workflow1/400/300', author_name: '创意达人', author_avatar: '', tags: '图像生成,艺术,风格转换', likes: 1258, views: 8920 },
            { id: '2', title: '赛博朋克场景生成', description: '生成令人惊叹的赛博朋克风格场景，未来都市夜景', cover_image: 'https://picsum.photos/seed/workflow2/400/300', author_name: '未来主义者', author_avatar: '', tags: '图像生成,赛博朋克,科幻', likes: 2341, views: 15680 },
            { id: '3', title: '3D角色生成器', description: '快速生成高质量3D角色模型，支持多种风格', cover_image: 'https://picsum.photos/seed/workflow3/400/300', author_name: '数字艺术家', author_avatar: '', tags: '3D生成,角色设计,游戏', likes: 892, views: 6750 },
            { id: '4', title: 'AI音乐创作', description: '基于文本描述生成原创音乐作品', cover_image: 'https://picsum.photos/seed/workflow4/400/300', author_name: '音乐制作人', author_avatar: '', tags: '音频生成,音乐,AI作曲', likes: 1567, views: 12340 },
            { id: '5', title: '视频风格迁移', description: '将视频转换为不同的视觉风格', cover_image: 'https://picsum.photos/seed/workflow5/400/300', author_name: '视频创作者', author_avatar: '', tags: '视频生成,风格迁移,特效', likes: 789, views: 5430 },
            { id: '6', title: 'AI插画助手', description: '辅助插画师快速生成创意草图和配色方案', cover_image: 'https://picsum.photos/seed/workflow6/400/300', author_name: '插画师小明', author_avatar: '', tags: '图像生成,插画,创意', likes: 2156, views: 18920 },
            ...savedWorkflows
        ],
        artworks: [
            { id: '1', title: '霓虹城市夜景', description: '赛博朋克风格的未来都市夜景，霓虹灯光闪烁', url: 'https://picsum.photos/seed/artwork1/800/600', thumbnail: 'https://picsum.photos/seed/artwork1/400/300', author_name: '夜行者', author_avatar: '', likes: 3421, comments: 156 },
            { id: '2', title: '数字梦境', description: '超现实的数字艺术作品，探索梦境与现实的边界', url: 'https://picsum.photos/seed/artwork2/800/600', thumbnail: 'https://picsum.photos/seed/artwork2/400/300', author_name: '梦境探索者', author_avatar: '', likes: 2876, comments: 98 },
            { id: '3', title: '量子星空', description: 'AI生成的宇宙星空，展现量子世界的神秘之美', url: 'https://picsum.photos/seed/artwork3/800/600', thumbnail: 'https://picsum.photos/seed/artwork3/400/300', author_name: '星际旅人', author_avatar: '', likes: 4521, comments: 234 },
            { id: '4', title: '机械樱花', description: '未来科技与自然的融合，机械花瓣飘落', url: 'https://picsum.photos/seed/artwork4/800/600', thumbnail: 'https://picsum.photos/seed/artwork4/400/300', author_name: '机械诗人', author_avatar: '', likes: 1987, comments: 76 },
            { id: '5', title: '深海遗迹', description: '神秘的海底文明遗迹，AI还原古老传说', url: 'https://picsum.photos/seed/artwork5/800/600', thumbnail: 'https://picsum.photos/seed/artwork5/400/300', author_name: '海洋探险家', author_avatar: '', likes: 3123, comments: 189 },
            { id: '6', title: '数字文艺复兴', description: '经典艺术风格与数字技术的碰撞', url: 'https://picsum.photos/seed/artwork6/800/600', thumbnail: 'https://picsum.photos/seed/artwork6/400/300', author_name: '古典与现代', author_avatar: '', likes: 2567, comments: 145 },
            ...savedArtworks
        ],
        models: [
            { id: '1', name: 'Stable Diffusion XL', description: '最新一代图像生成模型，支持高分辨率输出', cover_image: 'https://picsum.photos/seed/model1/400/300', category: '图像生成', type: '扩散模型', likes: 15620, downloads: 89200 },
            { id: '2', name: 'DALL-E 3', description: 'OpenAI推出的先进图像生成模型', cover_image: 'https://picsum.photos/seed/model2/400/300', category: '图像生成', type: 'Transformer', likes: 12340, downloads: 67500 },
            { id: '3', name: 'MidJourney v6', description: '业界领先的AI图像生成模型', cover_image: 'https://picsum.photos/seed/model3/400/300', category: '图像生成', type: '扩散模型', likes: 18920, downloads: 98700 },
            { id: '4', name: 'Whisper', description: 'OpenAI的语音识别模型', cover_image: 'https://picsum.photos/seed/model4/400/300', category: '音频处理', type: 'Transformer', likes: 8760, downloads: 45200 },
            { id: '5', name: 'GPT-4', description: '强大的大语言模型，支持多模态理解', cover_image: 'https://picsum.photos/seed/model5/400/300', category: '大语言模型', type: 'Transformer', likes: 25680, downloads: 156000 },
            { id: '6', name: 'ControlNet', description: '控制图像生成的强大工具', cover_image: 'https://picsum.photos/seed/model6/400/300', category: '图像生成', type: '扩散模型', likes: 11230, downloads: 56800 }
        ]
    };
}

let mockData = loadMockData();

// 解析URL参数
function parseUrlParams(url) {
    const params = {};
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    for (const [key, value] of urlParams) {
        params[key] = decodeURIComponent(value);
    }
    return params;
}

// 模拟API请求
async function mockFetch(endpoint, options = {}) {
    const params = parseUrlParams(endpoint);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // 工作流相关
            if (endpoint.includes('/api/workflows')) {
                if (endpoint.match(/\/api\/workflows\/(\d+)/)) {
                    const id = endpoint.match(/\/api\/workflows\/(\d+)/)[1];
                    const workflow = mockData.workflows.find(w => w.id === id);
                    resolve({ ok: true, json: () => Promise.resolve(workflow || {}) });
                } else {
                    let workflows = [...mockData.workflows];
                    // 根据category过滤
                    if (params.category && params.category !== 'all') {
                        workflows = workflows.filter(w => w.tags.includes(params.category));
                    }
                    // 根据search过滤
                    if (params.search) {
                        const searchLower = params.search.toLowerCase();
                        workflows = workflows.filter(w => 
                            w.title.toLowerCase().includes(searchLower) ||
                            w.description.toLowerCase().includes(searchLower)
                        );
                    }
                    resolve({ ok: true, json: () => Promise.resolve(workflows) });
                }
            }
            // 作品相关
            else if (endpoint.includes('/api/artworks')) {
                if (endpoint.includes('/comments')) {
                    // 提取作品ID
                    const artworkId = endpoint.match(/\/api\/artworks\/(\d+)\/comments/)[1];
                    if (options && options.method === 'POST') {
                        // 发表评论
                        const body = JSON.parse(options.body);
                        const newComment = {
                            id: generateId(),
                            artwork_id: artworkId,
                            content: body.content,
                            author_name: state.user ? state.user.username : '匿名用户',
                            author_avatar: state.user ? state.user.avatar || '' : '',
                            created_at: new Date().toISOString()
                        };
                        // 保存评论到localStorage
                        const comments = JSON.parse(localStorage.getItem('aicreate_comments') || '[]');
                        comments.unshift(newComment);
                        localStorage.setItem('aicreate_comments', JSON.stringify(comments));
                        resolve({ ok: true, json: () => Promise.resolve(newComment) });
                    } else {
                        // 获取评论
                        const comments = JSON.parse(localStorage.getItem('aicreate_comments') || '[]');
                        const artworkComments = comments.filter(c => c.artwork_id === artworkId);
                        resolve({ ok: true, json: () => Promise.resolve(artworkComments) });
                    }
                } else if (endpoint.match(/\/api\/artworks\/(\d+)$/)) {
                    const id = endpoint.match(/\/api\/artworks\/(\d+)$/)[1];
                    const artwork = mockData.artworks.find(a => a.id === id);
                    resolve({ ok: true, json: () => Promise.resolve(artwork || {}) });
                } else if (options && options.method === 'POST') {
                    // 创建新作品
                    const body = JSON.parse(options.body);
                    const newArtwork = {
                        id: generateId(),
                        title: body.title,
                        description: body.description,
                        url: body.url,
                        thumbnail: body.thumbnail || body.url,
                        author_name: state.user ? state.user.username : '匿名用户',
                        author_avatar: '',
                        likes: 0,
                        comments: 0,
                        type: body.type,
                        tags: body.type === 'image' ? '图片' : '视频'
                    };
                    // 添加到mock数据
                    mockData.artworks.unshift(newArtwork);
                    // 保存到localStorage
                    const savedArtworks = JSON.parse(localStorage.getItem('aicreate_artworks') || '[]');
                    savedArtworks.unshift(newArtwork);
                    localStorage.setItem('aicreate_artworks', JSON.stringify(savedArtworks));
                    resolve({ ok: true, json: () => Promise.resolve(newArtwork) });
                } else {
                    let artworks = [...mockData.artworks];
                    // 根据type过滤
                    if (params.type && params.type !== 'all') {
                        artworks = artworks.filter(a => a.tags && a.tags.includes(params.type));
                    }
                    // 根据search过滤
                    if (params.search) {
                        const searchLower = params.search.toLowerCase();
                        artworks = artworks.filter(a => 
                            a.title.toLowerCase().includes(searchLower) ||
                            a.description.toLowerCase().includes(searchLower)
                        );
                    }
                    resolve({ ok: true, json: () => Promise.resolve(artworks) });
                }
            }
            // 模型相关
            else if (endpoint.includes('/api/models')) {
                if (endpoint.match(/\/api\/models\/(\d+)/)) {
                    const id = endpoint.match(/\/api\/models\/(\d+)/)[1];
                    const model = mockData.models.find(m => m.id === id);
                    resolve({ ok: true, json: () => Promise.resolve(model || {}) });
                } else {
                    let models = [...mockData.models];
                    // 根据category过滤
                    if (params.category && params.category !== 'all') {
                        models = models.filter(m => m.category === params.category);
                    }
                    // 根据search过滤
                    if (params.search) {
                        const searchLower = params.search.toLowerCase();
                        models = models.filter(m => 
                            m.name.toLowerCase().includes(searchLower) ||
                            m.description.toLowerCase().includes(searchLower)
                        );
                    }
                    resolve({ ok: true, json: () => Promise.resolve(models) });
                }
            }
            // 用户相关
            else if (endpoint.includes('/api/user/stats')) {
                // 获取用户收藏数
                const favorites = JSON.parse(localStorage.getItem('aicreate_favorites') || '[]');
                const userFavorites = favorites.filter(f => f.user_id === state.user.id);
                // 使用实际返回的数据量，保持一致性
                const userArtworksCount = mockData.artworks.slice(0, 3).length;
                const userWorkflowsCount = mockData.workflows.slice(0, 2).length;
                resolve({ 
                    ok: true, 
                    json: () => Promise.resolve({ 
                        artworks: userArtworksCount, 
                        workflows: userWorkflowsCount, 
                        favorites: userFavorites.length,
                        likes: 1258, 
                        followers: 234,
                        following: 156 
                    }) 
                });
            }
            else if (endpoint.includes('/api/user/artworks')) {
                // 返回当前用户的作品（模拟数据）
                const userArtworks = mockData.artworks.slice(0, 3);
                resolve({ ok: true, json: () => Promise.resolve(userArtworks) });
            }
            else if (endpoint.includes('/api/user/workflows')) {
                // 返回当前用户的工作流（模拟数据）
                const userWorkflows = mockData.workflows.slice(0, 2);
                resolve({ ok: true, json: () => Promise.resolve(userWorkflows) });
            }
            // 认证相关
            else if (endpoint.includes('/api/auth/me')) {
                // 根据 token 获取用户信息
                const token = options.headers.Authorization?.replace('Bearer ', '');
                if (token) {
                    const tokenMap = JSON.parse(localStorage.getItem('aicreate_token_map') || '{}');
                    const userId = tokenMap[token];
                    if (userId) {
                        const users = JSON.parse(localStorage.getItem('aicreate_users') || '[]');
                        const user = users.find(u => u.id === userId);
                        if (user) {
                            resolve({ 
                                ok: true, 
                                json: () => Promise.resolve({ 
                                    id: user.id, 
                                    username: user.username, 
                                    name: user.username,
                                    email: user.email,
                                    avatar: '' 
                                }) 
                            });
                            return;
                        }
                    }
                }
                resolve({ ok: false });
            } else if (endpoint.includes('/api/auth/login')) {
                if (options && options.body) {
                    const body = JSON.parse(options.body);
                    const user = findUserByEmail(body.email);
                    
                    if (user && user.password === body.password) {
                        // 登录成功
                        const token = 'token_' + generateId();
                        // 保存 token 和用户的映射关系
                        const tokenMap = JSON.parse(localStorage.getItem('aicreate_token_map') || '{}');
                        tokenMap[token] = user.id;
                        localStorage.setItem('aicreate_token_map', JSON.stringify(tokenMap));
                        resolve({ 
                            ok: true, 
                            json: () => Promise.resolve({ 
                                token: token, 
                                user: { 
                                    id: user.id, 
                                    username: user.username, 
                                    name: user.username,
                                    email: user.email,
                                    avatar: '' 
                                } 
                            }) 
                        });
                    } else {
                        // 登录失败
                        resolve({ ok: false, status: 401, json: () => Promise.resolve({ error: '邮箱或密码错误' }) });
                    }
                } else {
                    resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: '缺少登录信息' }) });
                }
            } else if (endpoint.includes('/api/auth/register')) {
                if (options && options.body) {
                    const body = JSON.parse(options.body);
                    
                    // 验证用户名
                    if (!body.username || body.username.length < 3) {
                        resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: '用户名至少需要3个字符' }) });
                        return;
                    }
                    
                    // 验证邮箱格式
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!body.email || !emailRegex.test(body.email)) {
                        resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: '请输入有效的邮箱地址' }) });
                        return;
                    }
                    
                    // 验证密码
                    if (!body.password || body.password.length < 6) {
                        resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: '密码至少需要6个字符' }) });
                        return;
                    }
                    
                    // 检查用户名是否已存在
                    if (isUsernameExists(body.username)) {
                        resolve({ ok: false, status: 409, json: () => Promise.resolve({ error: '该用户名已被注册' }) });
                        return;
                    }
                    
                    // 检查邮箱是否已存在
                    if (isEmailExists(body.email)) {
                        resolve({ ok: false, status: 409, json: () => Promise.resolve({ error: '该邮箱已被注册' }) });
                        return;
                    }
                    
                    // 注册成功
                    const newUser = {
                        id: generateId(),
                        username: body.username,
                        email: body.email,
                        password: body.password, // 注意：实际项目中应该加密存储
                        createdAt: new Date().toISOString()
                    };
                    
                    saveUser(newUser);
                    
                    const token = 'token_' + generateId();
                    // 保存 token 和用户的映射关系
                    const tokenMap = JSON.parse(localStorage.getItem('aicreate_token_map') || '{}');
                    tokenMap[token] = newUser.id;
                    localStorage.setItem('aicreate_token_map', JSON.stringify(tokenMap));
                    resolve({ 
                        ok: true, 
                        json: () => Promise.resolve({ 
                            token: token, 
                            user: { 
                                id: newUser.id, 
                                username: newUser.username, 
                                name: newUser.username,
                                email: newUser.email,
                                avatar: '' 
                            } 
                        }) 
                    });
                } else {
                    resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: '缺少注册信息' }) });
                }
            }
            // 点赞/收藏
            else if (endpoint.includes('/api/like')) {
                if (options && options.method === 'POST') {
                    const body = JSON.parse(options.body);
                    const likes = JSON.parse(localStorage.getItem('aicreate_likes') || '[]');
                    const existingIndex = likes.findIndex(l => l.user_id === state.user.id && l.item_id === body.item_id && l.item_type === body.item_type);
                    
                    if (existingIndex !== -1) {
                        // 取消点赞
                        likes.splice(existingIndex, 1);
                        localStorage.setItem('aicreate_likes', JSON.stringify(likes));
                        resolve({ ok: true, json: () => Promise.resolve({ success: true, liked: false }) });
                    } else {
                        // 添加点赞
                        likes.push({
                            id: generateId(),
                            user_id: state.user.id,
                            item_id: body.item_id,
                            item_type: body.item_type,
                            created_at: new Date().toISOString()
                        });
                        localStorage.setItem('aicreate_likes', JSON.stringify(likes));
                        resolve({ ok: true, json: () => Promise.resolve({ success: true, liked: true }) });
                    }
                } else {
                    // 获取点赞列表
                    const likes = JSON.parse(localStorage.getItem('aicreate_likes') || '[]');
                    const userLikes = likes.filter(l => l.user_id === state.user.id);
                    resolve({ ok: true, json: () => Promise.resolve(userLikes) });
                }
            } else if (endpoint.includes('/api/favorites')) {
                if (options && options.method === 'POST') {
                    // 添加/取消收藏
                    const body = JSON.parse(options.body);
                    const favorites = JSON.parse(localStorage.getItem('aicreate_favorites') || '[]');
                    const existingIndex = favorites.findIndex(f => f.user_id === state.user.id && f.item_id === body.item_id && f.item_type === body.item_type);
                    
                    if (existingIndex !== -1) {
                        // 取消收藏
                        favorites.splice(existingIndex, 1);
                        localStorage.setItem('aicreate_favorites', JSON.stringify(favorites));
                        resolve({ ok: true, json: () => Promise.resolve({ success: true, favorited: false }) });
                    } else {
                        // 添加收藏
                        favorites.push({
                            id: generateId(),
                            user_id: state.user.id,
                            item_id: body.item_id,
                            item_type: body.item_type,
                            created_at: new Date().toISOString()
                        });
                        localStorage.setItem('aicreate_favorites', JSON.stringify(favorites));
                        resolve({ ok: true, json: () => Promise.resolve({ success: true, favorited: true }) });
                    }
                } else {
                    // 获取收藏列表
                    const favorites = JSON.parse(localStorage.getItem('aicreate_favorites') || '[]');
                    const userFavorites = favorites.filter(f => f.user_id === state.user.id);
                    
                    // 获取收藏的实际内容
                    const favoriteItems = userFavorites.map(fav => {
                        if (fav.item_type === 'artwork') {
                            return { ...mockData.artworks.find(a => a.id === fav.item_id), favorite_id: fav.id };
                        } else if (fav.item_type === 'workflow') {
                            return { ...mockData.workflows.find(w => w.id === fav.item_id), favorite_id: fav.id };
                        } else if (fav.item_type === 'model') {
                            return { ...mockData.models.find(m => m.id === fav.item_id), favorite_id: fav.id };
                        }
                        return null;
                    }).filter(Boolean);
                    
                    resolve({ ok: true, json: () => Promise.resolve(favoriteItems) });
                }
            }
            // 默认
            else {
                resolve({ ok: true, json: () => Promise.resolve([]) });
            }
        }, 300);
    });
}

// 全局状态
const state = {
    user: null,
    token: localStorage.getItem('token'),
    currentPage: 'home'
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    router.navigate('home');
    setupEventListeners();
});

// 初始化认证
async function initAuth() {
    if (state.token) {
        try {
            const response = await mockFetch(`${API_BASE}/api/auth/me`, {
                headers: { 'Authorization': `Bearer ${state.token}` }
            });
            if (response.ok) {
                state.user = await response.json();
                updateUserMenu();
            } else {
                localStorage.removeItem('token');
                state.token = null;
            }
        } catch (error) {
            console.error('Auth init error:', error);
        }
    }
}

// 更新用户菜单
// 切换用户下拉菜单
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    const overlay = document.getElementById('dropdownOverlay');
    if (dropdown) {
        const isActive = dropdown.classList.contains('active');
        if (isActive) {
            dropdown.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            dropdown.classList.add('active');
            overlay.classList.add('active');
        }
    }
}

// 点击遮罩关闭下拉菜单
function closeDropdown() {
    const dropdown = document.getElementById('userDropdown');
    const overlay = document.getElementById('dropdownOverlay');
    dropdown.classList.remove('active');
    overlay.classList.remove('active');
}

function updateUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (state.user) {
        userMenu.innerHTML = `
            <img src="${state.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.username}`}" 
                 alt="${state.user.username}" class="user-avatar" onclick="toggleUserDropdown()">
            <div class="dropdown-overlay" id="dropdownOverlay" onclick="closeDropdown()"></div>
            <div class="dropdown-menu" id="userDropdown">
                <a href="#" onclick="router.navigate('profile'); closeDropdown()">个人中心</a>
                <a href="#" onclick="openSettingsModal(); closeDropdown()">设置</a>
                <hr>
                <a href="#" onclick="logout(); closeDropdown()">退出登录</a>
            </div>
        `;
    } else {
        userMenu.innerHTML = `<button class="btn btn-outline" onclick="openModal('authModal')">登录</button>`;
    }
}

// 路由
const router = {
    routes: {
        'home': renderHome,
        'workflows': renderWorkflows,
        'artworks': renderArtworks,
        'models': renderModels,
        'analytics': renderAnalytics,
        'aiqa': renderAIQA,
        'workflow-detail': renderWorkflowDetail,
        'artwork-detail': renderArtworkDetail,
        'model-detail': renderModelDetail,
        'profile': renderProfile,
        'create': renderCreate,
        'login': () => openModal('authModal')
    },
    
    navigate(page, params = {}) {
        state.currentPage = page;
        const renderFunc = this.routes[page];
        if (renderFunc) {
            renderFunc(params);
        }
        window.scrollTo(0, 0);
        
        // 更新导航链接的active类
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // 根据页面设置对应的active类
        const pageMap = {
            'home': '首页',
            'workflows': '工作流',
            'artworks': '作品',
            'models': '模型库',
            'analytics': '数据可视化',
            'aiqa': '次奥小白AI助手',
            'profile': '个人中心'
        };
        
        const navLink = Array.from(document.querySelectorAll('.nav-link')).find(link => 
            link.textContent === pageMap[page]
        );
        if (navLink) {
            navLink.classList.add('active');
        }
    }
};

// 渲染首页
async function renderHome() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="hero">
            <div class="hero-grid"></div>
            <div class="hero-particles">${generateParticles(20)}</div>
            <div class="hero-content">
                <h1>AI驱动的内容创作平台</h1>
                <p>发现、分享、创作 - 探索无限可能的AI创作世界</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="router.navigate('workflows')">
                        <i class="fas fa-compass"></i> 探索工作流
                    </button>
                    <button class="btn btn-outline" onclick="router.navigate('create')">
                        <i class="fas fa-plus"></i> 开始创作
                    </button>
                </div>
            </div>
        </section>
        
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-fire"></i> 热门工作流</h2>
                <a href="#" class="view-all" onclick="router.navigate('workflows')">查看全部 <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="card-grid" id="homeWorkflows">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
        
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-image"></i> 精选作品</h2>
                <a href="#" class="view-all" onclick="router.navigate('artworks')">查看全部 <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="card-grid" id="homeArtworks">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
        
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-cube"></i> 热门模型</h2>
                <a href="#" class="view-all" onclick="router.navigate('models')">查看全部 <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="card-grid" id="homeModels">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
    `;
    
    // 加载数据
    loadHomeData();
}

// 加载首页数据
async function loadHomeData() {
    try {
        // 加载工作流
        const workflowsRes = await mockFetch(`${API_BASE}/api/workflows?limit=6`);
        const workflows = await workflowsRes.json();
        document.getElementById('homeWorkflows').innerHTML = workflows.map(w => createWorkflowCard(w)).join('');
        
        // 加载作品
        const artworksRes = await mockFetch(`${API_BASE}/api/artworks?limit=6`);
        const artworks = await artworksRes.json();
        document.getElementById('homeArtworks').innerHTML = artworks.map(a => createArtworkCard(a)).join('');
        
        // 加载模型
        const modelsRes = await mockFetch(`${API_BASE}/api/models?limit=6`);
        const models = await modelsRes.json();
        document.getElementById('homeModels').innerHTML = models.map(m => createModelCard(m)).join('');
    } catch (error) {
        console.error('Load home data error:', error);
    }
}

// 渲染工作流页面
async function renderWorkflows() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-project-diagram"></i> 工作流市场</h2>
            </div>
            <div class="category-tabs">
                <button class="category-tab active" onclick="filterWorkflows('all')">全部</button>
                <button class="category-tab" onclick="filterWorkflows('图像生成')">图像生成</button>
                <button class="category-tab" onclick="filterWorkflows('视频生成')">视频生成</button>
                <button class="category-tab" onclick="filterWorkflows('音频生成')">音频生成</button>
                <button class="category-tab" onclick="filterWorkflows('3D生成')">3D生成</button>
            </div>
            <div class="card-grid" id="workflowsGrid">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
    `;
    
    loadWorkflows();
}

// 加载工作流
async function loadWorkflows(category = 'all', search = '') {
    try {
        let url = `${API_BASE}/api/workflows?limit=20`;
        if (category !== 'all') url += `&category=${category}`;
        if (search) url += `&search=${search}`;
        
        const response = await mockFetch(url);
        const workflows = await response.json();
        
        const grid = document.getElementById('workflowsGrid');
        if (workflows.length === 0) {
            grid.innerHTML = createEmptyState('暂无工作流', '成为第一个分享工作流的人吧！');
        } else {
            grid.innerHTML = workflows.map(w => createWorkflowCard(w)).join('');
        }
    } catch (error) {
        console.error('Load workflows error:', error);
    }
}

// 渲染作品页面
async function renderArtworks() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-images"></i> 作品广场</h2>
            </div>
            <div class="category-tabs">
                <button class="category-tab active" onclick="filterArtworks('all')">全部</button>
                <button class="category-tab" onclick="filterArtworks('image')">图片</button>
                <button class="category-tab" onclick="filterArtworks('video')">视频</button>
            </div>
            <div class="card-grid" id="artworksGrid">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
    `;
    
    loadArtworks();
}

// 加载作品
async function loadArtworks(type = 'all', search = '') {
    try {
        let url = `${API_BASE}/api/artworks?limit=20`;
        if (type !== 'all') url += `&type=${type}`;
        if (search) url += `&search=${search}`;
        
        const response = await mockFetch(url);
        const artworks = await response.json();
        
        const grid = document.getElementById('artworksGrid');
        if (artworks.length === 0) {
            grid.innerHTML = createEmptyState('暂无作品', '分享你的第一个AI创作吧！');
        } else {
            grid.innerHTML = artworks.map(a => createArtworkCard(a)).join('');
        }
    } catch (error) {
        console.error('Load artworks error:', error);
    }
}

// 渲染AI问答页面
function renderAIQA() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="aiqa-container">
            <div class="aiqa-header">
                <h1>次奥小白AICreate助手</h1>
                <p>与AI助手对话，获取创作灵感和技术支持</p>
            </div>
            
            <div class="aiqa-chat">
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>你好！我是次奥小白，有什么可以帮助你的吗？</p>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input">
                    <textarea id="chatInput" placeholder="输入你的问题..."></textarea>
                    <button class="btn btn-primary" onclick="sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// AI问答模拟回复
const aiResponses = [
    '这是一个很好的问题！让我来为你解答...',
    '根据你的需求，我建议你尝试以下方法：',
    '我来帮你分析一下这个问题：',
    '好的，我理解你的需求了。',
    '这是一个有趣的想法！让我想想...',
    '我来为你提供一些思路：'
];

const aiAnswers = {
    '工作流': '工作流是一系列工具和步骤的组合，可以帮助你快速完成特定的创作任务。你可以在工作流市场中浏览和使用各种预设的工作流。',
    '创作': '创作页面可以让你上传和分享自己的作品，包括图片和视频。你可以添加标题、描述，并关联相关的工作流。',
    '模型': '模型库包含各种AI模型，如Stable Diffusion、DALL-E等。你可以查看模型详情并下载使用。',
    '帮助': '如果你遇到问题，可以查看帮助文档，或联系我们的支持团队。',
    '灵感': '需要创作灵感？试试浏览精选作品页面，或者尝试不同的工作流来激发创意！',
    '你是谁': '我是AICreate平台的AI助手，专门为创作者提供帮助和支持。',
    '功能': 'AICreate提供工作流市场、作品分享、模型库和AI问答等功能。'
};

// 智谱GLM API配置
const QWEN_API_KEY = 'df333e5405994edb9f906564ce19d849.SDUdaTIP2BIjBmXt';
const QWEN_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const question = input.value.trim();
    
    if (!question) return;
    
    // 添加用户消息
    messages.innerHTML += `
        <div class="message user-message">
            <div class="avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${question}</p>
            </div>
        </div>
    `;
    
    input.value = '';
    
    // 添加加载状态
    messages.innerHTML += `
        <div class="message bot-message" id="loadingMessage">
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    messages.scrollTop = messages.scrollHeight;
    
    try {
        const requestData = {
            model: 'glm-4-flash',
            messages: [
                {
                    role: 'system',
                    content: '你的名字是次奥小白。你是一个专门帮助用户了解和使用AICreate创作平台的AI助手。请针对用户关于本平台功能（工作流市场、作品分享、模型库、AI问答等）的问题提供详细、清晰的回答。回答时请使用自然、友好的语言，不要使用markdown格式或任何特殊符号。'
                },
                {
                    role: 'user',
                    content: question
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        };
        
        const response = await fetch(QWEN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${QWEN_API_KEY}`
            },
            body: JSON.stringify(requestData)
        });
        
        // 移除加载状态
        document.getElementById('loadingMessage')?.remove();
        
        if (response.ok) {
            const data = await response.json();
            const answer = data.choices?.[0]?.message?.content || data.response || data.result || '抱歉，我无法回答这个问题。';
            
            messages.innerHTML += `
                <div class="message bot-message">
                    <div class="avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>${answer}</p>
                    </div>
                </div>
            `;
        } else {
            // API调用失败，显示错误信息并使用模拟回复
            const errorData = await response.text().catch(() => null);
            console.error('API Error Status:', response.status);
            console.error('API Error Response:', errorData);
            let answer = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            for (const [key, value] of Object.entries(aiAnswers)) {
                if (question.includes(key)) {
                    answer = value;
                    break;
                }
            }
            
            messages.innerHTML += `
                <div class="message bot-message">
                    <div class="avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>${answer}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        // 网络错误，使用模拟回复
        document.getElementById('loadingMessage')?.remove();
        
        let answer = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        for (const [key, value] of Object.entries(aiAnswers)) {
            if (question.includes(key)) {
                answer = value;
                break;
            }
        }
        
        messages.innerHTML += `
            <div class="message bot-message">
                <div class="avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${answer}</p>
                </div>
            </div>
        `;
    }
    
    // 滚动到底部
    messages.scrollTop = messages.scrollHeight;
}

// 渲染模型页面
async function renderModels() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-cube"></i> 模型库</h2>
            </div>
            <div class="category-tabs">
                <button class="category-tab active" onclick="filterModels('all')">全部</button>
                <button class="category-tab" onclick="filterModels('图像生成')">图像生成</button>
                <button class="category-tab" onclick="filterModels('视频生成')">视频生成</button>
                <button class="category-tab" onclick="filterModels('大语言模型')">大语言模型</button>
            </div>
            <div class="card-grid" id="modelsGrid">
                <div class="loading"><div class="spinner"></div></div>
            </div>
        </section>
    `;
    
    loadModels();
}

// 加载模型
async function loadModels(category = 'all', search = '') {
    try {
        let url = `${API_BASE}/api/models?limit=20`;
        if (category !== 'all') url += `&category=${category}`;
        if (search) url += `&search=${search}`;
        
        const response = await mockFetch(url);
        const models = await response.json();
        
        const grid = document.getElementById('modelsGrid');
        if (models.length === 0) {
            grid.innerHTML = createEmptyState('暂无模型', '模型库正在建设中...');
        } else {
            grid.innerHTML = models.map(m => createModelCard(m)).join('');
        }
    } catch (error) {
        console.error('Load models error:', error);
    }
}

// 渲染作品详情
async function renderArtworkDetail({ id }) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="loading" style="padding: 100px;"><div class="spinner"></div></div>`;
    
    try {
        const [artworkRes, commentsRes, likesRes, favoritesRes] = await Promise.all([
            mockFetch(`${API_BASE}/api/artworks/${id}`),
            mockFetch(`${API_BASE}/api/artworks/${id}/comments`),
            state.user ? mockFetch(`${API_BASE}/api/like`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
            state.user ? mockFetch(`${API_BASE}/api/favorites`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        ]);
        
        const artwork = await artworkRes.json();
        const comments = await commentsRes.json();
        const likes = state.user ? await likesRes.json() : [];
        const favorites = state.user ? await favoritesRes.json() : [];
        const isLiked = likes.some(l => l.item_id === id && l.item_type === 'artwork');
        const isFavorited = favorites.some(f => f.item_id === id && f.item_type === 'artwork');
        
        main.innerHTML = `
            <div class="artwork-detail">
                <div class="artwork-main">
                    <div class="artwork-image-container">
                        <img src="${artwork.url}" alt="${artwork.title}" class="artwork-image">
                    </div>
                    <div class="artwork-info">
                        <h1 class="artwork-title">${artwork.title}</h1>
                        <div class="artwork-author">
                            <img src="${artwork.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${artwork.author_name}`}" alt="${artwork.author_name}">
                            <div>
                                <div style="font-weight: 600;">${artwork.author_name}</div>
                                <div style="color: var(--text-secondary); font-size: 14px;">${formatDate(artwork.created_at)}</div>
                            </div>
                        </div>
                        <p style="color: var(--text-secondary); line-height: 1.8;">${artwork.description || '暂无描述'}</p>
                        <div class="artwork-actions">
                            <button class="btn btn-primary" onclick="likeItem('${artwork.id}', 'artwork')">
                                <i class="fas fa-heart${isLiked ? ' liked' : ''}"${isLiked ? ' style="color: #ef4444;"' : ''}></i> ${artwork.likes} 点赞
                            </button>
                            <button class="btn btn-outline favorite-btn" onclick="favoriteItem('${artwork.id}', 'artwork', this)">
                                <i class="fas fa-bookmark${isFavorited ? ' favorited' : ''}"${isFavorited ? ' style="color: #eab308;"' : ''}></i> 收藏
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="comments-section">
                    <h3 class="comments-title">评论 (${comments.length})</h3>
                    ${state.user ? `
                        <div class="comment-form">
                            <img src="${state.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.username}`}" alt="${state.user.username}">
                            <div class="comment-input-wrapper">
                                <div class="form-group" style="margin: 0;">
                                    <textarea id="commentContent" placeholder="写下你的评论..." rows="3"></textarea>
                                </div>
                                <button class="btn btn-primary" style="margin-top: 12px;" onclick="submitComment('${artwork.id}')">
                                    发表评论
                                </button>
                            </div>
                        </div>
                    ` : '<p style="color: var(--text-secondary); margin-bottom: 24px;">请登录后发表评论</p>'}
                    
                    <div class="comment-list">
                        ${comments.length === 0 ? 
                            '<p style="color: var(--text-secondary); text-align: center;">暂无评论，来抢沙发吧！</p>' :
                            comments.map(c => createCommentItem(c)).join('')
                        }
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Load artwork detail error:', error);
        main.innerHTML = createEmptyState('加载失败', '作品不存在或已删除');
    }
}

// 渲染个人中心
async function renderProfile() {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="loading" style="padding: 100px;"><div class="spinner"></div></div>`;
    
    try {
        const [statsRes, artworksRes, workflowsRes, favoritesRes, likesRes] = await Promise.all([
            mockFetch(`${API_BASE}/api/user/stats`, { headers: { 'Authorization': `Bearer ${state.token}` } }),
            mockFetch(`${API_BASE}/api/user/artworks`, { headers: { 'Authorization': `Bearer ${state.token}` } }),
            mockFetch(`${API_BASE}/api/user/workflows`, { headers: { 'Authorization': `Bearer ${state.token}` } }),
            mockFetch(`${API_BASE}/api/favorites`, { headers: { 'Authorization': `Bearer ${state.token}` } }),
            mockFetch(`${API_BASE}/api/like`, { headers: { 'Authorization': `Bearer ${state.token}` } })
        ]);
        
        const stats = await statsRes.json();
        const artworks = await artworksRes.json();
        const workflows = await workflowsRes.json();
        const favorites = await favoritesRes.json();
        const likes = await likesRes.json();
        
        main.innerHTML = `
            <div class="profile-header">
                <div class="profile-container">
                    <img src="${state.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.username}`}" 
                         alt="${state.user.username}" class="profile-avatar">
                    <div class="profile-info">
                        <h1>${state.user.username}</h1>
                        <p>${state.user.bio || '这个人很懒，还没有写简介...'}</p>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <div class="profile-stat-value">${stats.artworks}</div>
                                <div class="profile-stat-label">作品</div>
                            </div>
                            <div class="profile-stat">
                                <div class="profile-stat-value">${stats.workflows}</div>
                                <div class="profile-stat-label">工作流</div>
                            </div>
                            <div class="profile-stat">
                                <div class="profile-stat-value">${likes.length}</div>
                                <div class="profile-stat-label">点赞</div>
                            </div>
                            <div class="profile-stat">
                                <div class="profile-stat-value">${stats.favorites}</div>
                                <div class="profile-stat-label">收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-content">
                <div class="profile-tabs">
                    <button class="profile-tab active" onclick="switchProfileTab('artworks')">我的作品</button>
                    <button class="profile-tab" onclick="switchProfileTab('workflows')">我的工作流</button>
                    <button class="profile-tab" onclick="switchProfileTab('likes')">我的点赞</button>
                    <button class="profile-tab" onclick="switchProfileTab('favorites')">我的收藏</button>
                </div>
                
                <div id="profileTabContent">
                    <div class="scroll-container">
                        <button class="scroll-btn scroll-left" onclick="scrollContent('left')" style="display: none;">
                            <span>&lt;</span>
                        </button>
                        <div class="card-scroll">
                            <div class="card-grid">
                                ${artworks.length === 0 ? 
                                    createEmptyState('暂无作品', '点击"创作"按钮分享你的第一个作品') :
                                    artworks.map(a => createArtworkCard(a)).join('')
                                }
                            </div>
                        </div>
                        <button class="scroll-btn scroll-right" onclick="scrollContent('right')" style="display: none;">
                            <span>&gt;</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 保存数据供切换使用
        state.profileData = { artworks, workflows, favorites, likes };
    } catch (error) {
        console.error('Load profile error:', error);
    }
}

// 数据可视化页面
let charts = {};

function renderAnalytics() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="analytics-section">
            <div class="analytics-header">
                <h1><i class="fas fa-chart-line"></i> 数据可视化</h1>
                <p>实时查看平台数据统计和趋势分析</p>
            </div>
            
            <!-- 统计卡片 -->
            <div class="stats-cards">
                <div class="stat-card" id="statUsers">
                    <div class="stat-icon users-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">--</div>
                        <div class="stat-label">用户总数</div>
                    </div>
                </div>
                <div class="stat-card" id="statWorkflows">
                    <div class="stat-icon workflows-icon">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">--</div>
                        <div class="stat-label">工作流数量</div>
                    </div>
                </div>
                <div class="stat-card" id="statArtworks">
                    <div class="stat-icon artworks-icon">
                        <i class="fas fa-image"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">--</div>
                        <div class="stat-label">作品数量</div>
                    </div>
                </div>
                <div class="stat-card" id="statModels">
                    <div class="stat-icon models-icon">
                        <i class="fas fa-cube"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">--</div>
                        <div class="stat-label">模型数量</div>
                    </div>
                </div>
            </div>
            
            <!-- 图表区域 -->
            <div class="charts-grid">
                <div class="chart-container">
                    <h3><i class="fas fa-trending-up"></i> 平台增长趋势</h3>
                    <canvas id="trendChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3><i class="fas fa-pie-chart"></i> 工作流分类分布</h3>
                    <canvas id="categoryChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3><i class="fas fa-bar-chart"></i> 作品类型分布</h3>
                    <canvas id="artworkChart"></canvas>
                </div>
                <div class="chart-container">
                    <h3><i class="fas fa-award"></i> 热门内容排行</h3>
                    <div id="popularList">
                        <div class="loading"><div class="spinner"></div></div>
                    </div>
                </div>
            </div>
            
            <!-- 用户活跃度 -->
            ${state.user ? `
            <div class="chart-container full-width">
                <h3><i class="fas fa-calendar"></i> 我的创作活跃度</h3>
                <canvas id="activityChart"></canvas>
            </div>
            ` : ''}
        </section>
    `;
    
    loadAnalyticsData();
}

// 加载分析数据 - 使用真实数据库数据
async function loadAnalyticsData() {
    try {
        // 使用Promise.all并行获取所有数据
        const [overviewRes, categoriesRes, trendsRes, popularRes] = await Promise.all([
            fetch(`${API_BASE}/api/stats/overview`),
            fetch(`${API_BASE}/api/stats/categories`),
            fetch(`${API_BASE}/api/stats/trends?days=7`),
            fetch(`${API_BASE}/api/stats/popular`)
        ]);
        
        // 检查所有请求是否成功
        if (!overviewRes.ok || !categoriesRes.ok || !trendsRes.ok || !popularRes.ok) {
            throw new Error('API request failed');
        }
        
        const overview = await overviewRes.json();
        const categories = await categoriesRes.json();
        const trends = await trendsRes.json();
        const popular = await popularRes.json();
        
        // 更新统计卡片
        document.querySelector('#statUsers .stat-value').textContent = overview.users || 0;
        document.querySelector('#statWorkflows .stat-value').textContent = overview.workflows || 0;
        document.querySelector('#statArtworks .stat-value').textContent = overview.artworks || 0;
        document.querySelector('#statModels .stat-value').textContent = overview.models || 0;
        
        // 渲染图表
        renderTrendChart(trends);
        renderCategoryChart(categories.workflowCategories || []);
        renderArtworkChart(categories.artworkTypes || []);
        renderPopularList(popular);
        
        // 如果用户已登录，加载用户活跃度
        if (state.user) {
            try {
                const activityRes = await fetch(`${API_BASE}/api/stats/activity`, {
                    headers: { 'Authorization': `Bearer ${state.token}` }
                });
                
                if (activityRes.ok) {
                    const activity = await activityRes.json();
                    renderActivityChart(activity);
                }
            } catch (activityError) {
                console.warn('Load activity data failed, skipping:', activityError);
            }
        }
    } catch (error) {
        console.error('Load analytics data from API failed, using mock data:', error);
        
        // 使用mock数据作为后备
        renderAnalyticsWithMockData();
    }
}

// 使用mock数据渲染（API失败时调用）
function renderAnalyticsWithMockData() {
    const mockOverview = { users: 1258, workflows: 234, artworks: 567, models: 89 };
    const mockCategories = {
        workflowCategories: [
            { category: '图像生成', count: 156 },
            { category: '视频生成', count: 45 },
            { category: '音频生成', count: 23 },
            { category: '3D生成', count: 10 }
        ],
        artworkTypes: [
            { type: 'image', count: 456 },
            { type: 'video', count: 111 }
        ]
    };
    const mockTrends = [
        { date: '2024-01-01', workflows: 12, artworks: 34, users: 5 },
        { date: '2024-01-02', workflows: 8, artworks: 28, users: 8 },
        { date: '2024-01-03', workflows: 15, artworks: 42, users: 12 },
        { date: '2024-01-04', workflows: 10, artworks: 38, users: 6 },
        { date: '2024-01-05', workflows: 18, artworks: 55, users: 15 },
        { date: '2024-01-06', workflows: 22, artworks: 62, users: 18 },
        { date: '2024-01-07', workflows: 14, artworks: 48, users: 10 }
    ];
    const mockPopular = {
        topWorkflows: [
            { title: 'Stable Diffusion 文生图', likes: 528, views: 3256 },
            { title: 'Flux 高清图像生成', likes: 445, views: 2890 },
            { title: 'CogVideo 视频生成', likes: 389, views: 1567 },
            { title: 'AI艺术风格转换', likes: 312, views: 2134 },
            { title: '3D角色生成器', likes: 278, views: 1876 }
        ],
        topArtworks: [
            { title: '未来城市概念图', likes: 567 },
            { title: 'AI肖像艺术', likes: 432 },
            { title: '梦幻森林', likes: 389 },
            { title: '赛博朋克夜景', likes: 345 },
            { title: '数字梦境', likes: 298 }
        ],
        topModels: [
            { name: 'Stable Diffusion XL', downloads: 5000, likes: 1024 },
            { name: 'Flux Dev', downloads: 3200, likes: 892 },
            { name: 'CogVideoX', downloads: 1800, likes: 456 }
        ]
    };
    
    document.querySelector('#statUsers .stat-value').textContent = mockOverview.users;
    document.querySelector('#statWorkflows .stat-value').textContent = mockOverview.workflows;
    document.querySelector('#statArtworks .stat-value').textContent = mockOverview.artworks;
    document.querySelector('#statModels .stat-value').textContent = mockOverview.models;
    
    renderTrendChart(mockTrends);
    renderCategoryChart(mockCategories.workflowCategories);
    renderArtworkChart(mockCategories.artworkTypes);
    renderPopularList(mockPopular);
    
    if (state.user) {
        const mockActivity = [
            { date: '2024-01-01', artworks: 2, workflows: 1 },
            { date: '2024-01-02', artworks: 3, workflows: 0 },
            { date: '2024-01-03', artworks: 1, workflows: 2 },
            { date: '2024-01-04', artworks: 4, workflows: 1 },
            { date: '2024-01-05', artworks: 0, workflows: 3 },
            { date: '2024-01-06', artworks: 2, workflows: 0 },
            { date: '2024-01-07', artworks: 3, workflows: 1 }
        ];
        renderActivityChart(mockActivity);
    }
}

// 渲染趋势图表
function renderTrendChart(data) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    if (charts.trend) {
        charts.trend.destroy();
    }
    
    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [
                {
                    label: '工作流',
                    data: data.map(d => d.workflows),
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '作品',
                    data: data.map(d => d.artworks),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '用户',
                    data: data.map(d => d.users),
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#a0a0c0'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#a0a0c0' },
                    grid: { color: 'rgba(139, 92, 246, 0.1)' }
                },
                y: {
                    ticks: { color: '#a0a0c0' },
                    grid: { color: 'rgba(139, 92, 246, 0.1)' }
                }
            }
        }
    });
}

// 渲染分类饼图
function renderCategoryChart(data) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (charts.category) {
        charts.category.destroy();
    }
    
    const colors = ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];
    
    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.category),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: colors.slice(0, data.length),
                borderColor: '#0f0f1a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#a0a0c0'
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// 渲染作品类型柱状图
function renderArtworkChart(data) {
    const ctx = document.getElementById('artworkChart').getContext('2d');
    
    if (charts.artwork) {
        charts.artwork.destroy();
    }
    
    charts.artwork = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.type === 'image' ? '图片' : '视频'),
            datasets: [{
                label: '数量',
                data: data.map(d => d.count),
                backgroundColor: [
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    '#a855f7',
                    '#3b82f6'
                ],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: '#a0a0c0' },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: '#a0a0c0' },
                    grid: { color: 'rgba(139, 92, 246, 0.1)' }
                }
            }
        }
    });
}

// 渲染用户活跃度图表
function renderActivityChart(data) {
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    if (charts.activity) {
        charts.activity.destroy();
    }
    
    charts.activity = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.date),
            datasets: [
                {
                    label: '作品',
                    data: data.map(d => d.artworks),
                    backgroundColor: 'rgba(168, 85, 247, 0.8)',
                    borderColor: '#a855f7',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: '工作流',
                    data: data.map(d => d.workflows),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#a0a0c0'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#a0a0c0' },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: '#a0a0c0' },
                    grid: { color: 'rgba(139, 92, 246, 0.1)' },
                    beginAtZero: true
                }
            }
        }
    });
}

// 渲染热门内容列表
function renderPopularList(data) {
    const container = document.getElementById('popularList');
    
    container.innerHTML = `
        <div class="popular-tabs">
            <button class="popular-tab active" onclick="showPopularTab('workflows')">热门工作流</button>
            <button class="popular-tab" onclick="showPopularTab('artworks')">热门作品</button>
            <button class="popular-tab" onclick="showPopularTab('models')">热门模型</button>
        </div>
        
        <div class="popular-content">
            <div id="popularWorkflows" class="popular-list">
                ${data.topWorkflows.map((item, index) => `
                    <div class="popular-item">
                        <span class="popular-rank ${index < 3 ? 'top' : ''}">${index + 1}</span>
                        <div class="popular-info">
                            <div class="popular-title">${item.title}</div>
                            <div class="popular-stats">
                                <span><i class="fas fa-heart"></i> ${item.likes}</span>
                                <span><i class="fas fa-eye"></i> ${item.views}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div id="popularArtworks" class="popular-list" style="display: none;">
                ${data.topArtworks.map((item, index) => `
                    <div class="popular-item">
                        <span class="popular-rank ${index < 3 ? 'top' : ''}">${index + 1}</span>
                        <div class="popular-info">
                            <div class="popular-title">${item.title}</div>
                            <div class="popular-stats">
                                <span><i class="fas fa-heart"></i> ${item.likes}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div id="popularModels" class="popular-list" style="display: none;">
                ${data.topModels.map((item, index) => `
                    <div class="popular-item">
                        <span class="popular-rank ${index < 3 ? 'top' : ''}">${index + 1}</span>
                        <div class="popular-info">
                            <div class="popular-title">${item.name}</div>
                            <div class="popular-stats">
                                <span><i class="fas fa-download"></i> ${item.downloads}</span>
                                <span><i class="fas fa-heart"></i> ${item.likes}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 切换热门内容标签
function showPopularTab(tab) {
    document.querySelectorAll('.popular-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.popular-tab:nth-child(${tab === 'workflows' ? 1 : tab === 'artworks' ? 2 : 3})`).classList.add('active');
    
    document.querySelectorAll('.popular-list').forEach(l => l.style.display = 'none');
    document.getElementById(`popular${tab.charAt(0).toUpperCase() + tab.slice(1)}`).style.display = 'block';
}

// 渲染创建页面
// 存储上传的文件
let uploadedFile = null;

function renderCreate() {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="create-form">
            <h1>分享你的创作</h1>
            
            <div class="form-section">
                <h3><i class="fas fa-image"></i> 作品信息</h3>
                <div class="form-group">
                    <label>作品标题</label>
                    <input type="text" id="artworkTitle" placeholder="给你的作品起个名字">
                </div>
                <div class="form-group">
                    <label>作品描述</label>
                    <textarea id="artworkDesc" placeholder="描述一下你的创作..." rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label>作品类型</label>
                    <select id="artworkType">
                        <option value="image">图片</option>
                        <option value="video">视频</option>
                    </select>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-upload"></i> 上传作品</h3>
                <div class="image-upload" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>点击或拖拽上传作品</p>
                    <input type="file" id="artworkFile" style="display: none;" accept="image/*,video/*">
                </div>
                <div id="uploadPreview" style="display: none; margin-top: 16px;">
                    <img id="previewImage" style="max-width: 100%; max-height: 300px; border-radius: 8px;">
                    <button class="btn btn-outline btn-sm" onclick="removeUpload()" style="margin-top: 8px;">
                        <i class="fas fa-trash"></i> 移除图片
                    </button>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-project-diagram"></i> 关联工作流（可选）</h3>
                <div class="form-group">
                    <label>选择工作流</label>
                    <select id="workflowSelect">
                        <option value="">不关联工作流</option>
                    </select>
                </div>
            </div>
            
            <button class="btn btn-primary btn-block" onclick="submitArtwork()" style="margin-top: 24px;">
                <i class="fas fa-paper-plane"></i> 发布作品
            </button>
        </div>
    `;
    
    // 设置文件上传事件
    setupFileUpload();
    
    // 加载用户的工作流选项
    loadUserWorkflowsForSelect();
}

// 设置文件上传
function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('artworkFile');
    
    // 点击上传区域触发文件选择
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // 文件选择事件
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
    
    // 拖拽上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#a855f7';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#374151';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#374151';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        } else {
            alert('请上传图片文件');
        }
    });
}

// 处理文件上传
function handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        return;
    }
    
    uploadedFile = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadPreview').style.display = 'block';
        document.getElementById('uploadArea').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// 移除上传的文件
function removeUpload() {
    uploadedFile = null;
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'flex';
    document.getElementById('artworkFile').value = '';
}

// 创建卡片组件
function createWorkflowCard(workflow) {
    return `
        <div class="card" onclick="router.navigate('workflow-detail', { id: '${workflow.id}' })">
            <img src="${workflow.cover_image}" alt="${workflow.title}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${workflow.title}</h3>
                <p class="card-description">${workflow.description || '暂无描述'}</p>
                <div class="tags">
                    ${workflow.tags ? workflow.tags.split(',').slice(0, 3).map(t => `<span class="tag">${t.trim()}</span>`).join('') : ''}
                </div>
                <div class="card-meta" style="margin-top: 16px;">
                    <div class="card-author">
                        <img src="${workflow.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${workflow.author_name}`}" alt="${workflow.author_name}">
                        <span>${workflow.author_name}</span>
                    </div>
                    <div class="card-stats">
                        <span><i class="fas fa-heart"></i> ${workflow.likes}</span>
                        <span><i class="fas fa-eye"></i> ${workflow.views}</span>
                    </div>
                </div>
                <button class="btn btn-outline card-action-btn" onclick="event.stopPropagation(); runWorkflow('${workflow.id}')" style="margin-top: 12px; width: 100%;">
                    <i class="fas fa-play"></i> 运行工作流
                </button>
            </div>
        </div>
    `;
}

function createArtworkCard(artwork) {
    return `
        <div class="card" onclick="router.navigate('artwork-detail', { id: '${artwork.id}' })">
            <img src="${artwork.thumbnail || artwork.url}" alt="${artwork.title}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${artwork.title}</h3>
                <p class="card-description">${artwork.description || '暂无描述'}</p>
                <div class="card-meta">
                    <div class="card-author">
                        <img src="${artwork.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${artwork.author_name}`}" alt="${artwork.author_name}">
                        <span>${artwork.author_name}</span>
                    </div>
                    <div class="card-stats">
                        <span><i class="fas fa-heart"></i> ${artwork.likes}</span>
                        <span><i class="fas fa-comment"></i> ${artwork.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createModelCard(model) {
    return `
        <div class="card" onclick="router.navigate('model-detail', { id: '${model.id}' })">
            <img src="${model.cover_image}" alt="${model.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${model.name}</h3>
                <p class="card-description">${model.description || '暂无描述'}</p>
                <div class="tags">
                    <span class="tag">${model.category}</span>
                    <span class="tag">${model.type}</span>
                </div>
                <div class="card-meta" style="margin-top: 16px;">
                    <div class="card-stats">
                        <span><i class="fas fa-heart"></i> ${model.likes}</span>
                        <span><i class="fas fa-download"></i> ${model.downloads}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createCommentItem(comment) {
    return `
        <div class="comment">
            <img src="${comment.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author_name}`}" alt="${comment.author_name}">
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author_name}</span>
                    <span class="comment-time">${formatDate(comment.created_at)}</span>
                </div>
                <p class="comment-text">${comment.content}</p>
            </div>
        </div>
    `;
}

function createEmptyState(title, description) {
    return `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-inbox"></i>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
}

// 生成粒子效果
function generateParticles(count) {
    let particles = '';
    for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;
        const size = 2 + Math.random() * 4;
        particles += `
            <div class="particle" style="
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            "></div>
        `;
    }
    return particles;
}

// 辅助函数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// 打开设置弹窗
function openSettingsModal() {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    
    // 填充当前用户数据
    document.getElementById('settingsUsername').value = state.user.username || '';
    document.getElementById('settingsEmail').value = state.user.email || '';
    document.getElementById('settingsBio').value = state.user.bio || '';
    document.getElementById('settingsAvatar').value = state.user.avatar || '';
    
    // 显示当前头像
    const avatarImage = document.getElementById('avatarImage');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    if (state.user.avatar) {
        avatarImage.src = state.user.avatar;
        avatarImage.style.display = 'block';
        avatarPlaceholder.style.display = 'none';
    } else {
        avatarImage.src = '';
        avatarImage.style.display = 'none';
        avatarPlaceholder.style.display = 'block';
    }
    
    openModal('settingsModal');
}

// 头像上传处理
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarImage = document.getElementById('avatarImage');
            const avatarPlaceholder = document.querySelector('.avatar-placeholder');
            avatarImage.src = e.target.result;
            avatarImage.style.display = 'block';
            avatarPlaceholder.style.display = 'none';
            // 将base64数据保存到隐藏字段
            document.getElementById('settingsAvatar').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// 保存设置
function saveSettings(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const bio = formData.get('bio');
    const avatar = formData.get('avatar');
    
    // 更新state.user
    state.user.username = username || state.user.username;
    state.user.email = email || state.user.email;
    state.user.bio = bio;
    state.user.avatar = avatar || state.user.avatar;
    
    // 保存到localStorage
    const users = JSON.parse(localStorage.getItem('aicreate_users') || '[]');
    const userIndex = users.findIndex(u => u.id === state.user.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...state.user };
        localStorage.setItem('aicreate_users', JSON.stringify(users));
    }
    
    // 更新用户菜单中的头像和用户名
    updateUserMenu();
    
    // 如果当前在个人中心页面，重新渲染页面以显示更新后的信息
    if (state.currentPage === 'profile') {
        renderProfile();
    }
    
    // 关闭弹窗
    closeModal('settingsModal');
    
    // 显示成功提示
    showToast('设置已保存', 'success');
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('registerForm').style.display = 'none';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'flex';
    }
}

async function submitComment(artworkId) {
    const content = document.getElementById('commentContent').value;
    if (!content.trim()) return;
    
    try {
        const response = await mockFetch(`${API_BASE}/api/artworks/${artworkId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ content })
        });
        
        if (response.ok) {
            router.navigate('artwork-detail', { id: artworkId });
        }
    } catch (error) {
        console.error('Submit comment error:', error);
    }
}

function downloadModel(modelId, modelName) {
    showToast(`正在准备下载 "${modelName}"...`, 'info');
    
    setTimeout(() => {
        showToast(`模型 "${modelName}" 下载完成！`, 'success');
    }, 1500);
}

async function likeItem(itemId, type) {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    
    try {
        const response = await mockFetch(`${API_BASE}/api/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ item_id: itemId, item_type: type })
        });
        
        const data = await response.json();
        
        // 更新当前页面的点赞按钮样式
        const likeButtons = document.querySelectorAll('.btn-primary, .btn-outline');
        likeButtons.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick && onclick.includes(`likeItem('${itemId}'`)) {
                const icon = btn.querySelector('i.fas.fa-heart');
                if (icon) {
                    if (data.liked) {
                        icon.style.color = '#ef4444';
                        icon.classList.add('liked');
                    } else {
                        icon.style.color = '';
                        icon.classList.remove('liked');
                    }
                }
            }
        });
        
        // 如果当前在个人中心页面，刷新页面显示更新后的点赞数和点赞列表
        if (state.currentPage === 'profile') {
            renderProfile();
        } else {
            // 刷新页面显示新点赞数
            router.navigate(state.currentPage, { id: itemId });
        }
    } catch (error) {
        console.error('Like error:', error);
    }
}

// 运行工作流（打开弹窗）
function runWorkflow(workflowId) {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    // 保存当前工作流ID到状态
    state.currentWorkflowId = workflowId;
    // 重置表单
    document.getElementById('workflowPrompt').value = '';
    // 打开弹窗
    openModal('runWorkflowModal');
}

// AI图像生成
async function generateImage() {
    const prompt = document.getElementById('workflowPrompt').value.trim();
    const content = document.getElementById('workflowRunContent');
    
    if (!prompt) {
        showToast('请输入图像描述', 'error');
        return;
    }
    
    try {
        // 显示生成中状态
        content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="spinner" style="margin: 0 auto 20px;"></div>
                <p style="color: var(--text-secondary);">AI正在生成图像...</p>
            </div>
        `;
        
        // 模拟AI图像生成过程
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 生成成功，保存作品
        const workflowId = state.currentWorkflowId;
        const newArtwork = {
            id: generateId(),
            title: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
            description: prompt,
            url: `https://picsum.photos/800/600?random=${Date.now()}`,
            thumbnail: `https://picsum.photos/400/300?random=${Date.now()}`,
            author_name: state.user ? state.user.username : '匿名用户',
            author_avatar: state.user ? state.user.avatar : '',
            likes: 0,
            comments: 0,
            type: 'image',
            tags: 'AI生成',
            created_at: new Date().toISOString(),
            workflow_id: workflowId
        };
        
        // 添加到mock数据
        mockData.artworks.unshift(newArtwork);
        // 保存到localStorage
        const savedArtworks = JSON.parse(localStorage.getItem('aicreate_artworks') || '[]');
        savedArtworks.unshift(newArtwork);
        localStorage.setItem('aicreate_artworks', JSON.stringify(savedArtworks));
        
        // 显示生成结果
        content.innerHTML = `
            <div style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <i class="fas fa-check" style="color: white; font-size: 36px;"></i>
                    </div>
                    <h3 style="margin-bottom: 12px;">图像生成完成</h3>
                    <p style="color: var(--text-secondary);">您的AI作品已成功生成！</p>
                </div>
                <div style="border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                    <img src="${newArtwork.url}" alt="${newArtwork.title}" style="width: 100%; max-height: 300px; object-fit: cover;">
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="closeModal('runWorkflowModal'); router.navigate('artworks')">
                    查看作品列表
                </button>
                <button class="btn btn-outline" style="width: 100%;" onclick="generateImageAgain()">
                    继续生成
                </button>
            </div>
        `;
    } catch (error) {
        console.error('Generate image error:', error);
        content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #ef4444, #dc2626); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <i class="fas fa-times" style="color: white; font-size: 36px;"></i>
                </div>
                <h3 style="margin-bottom: 12px;">生成失败</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">图像生成过程中出现错误，请重试</p>
                <button class="btn btn-primary" onclick="generateImage()">
                    重试
                </button>
            </div>
        `;
    }
}

// 继续生成图像
function generateImageAgain() {
    document.getElementById('workflowPrompt').value = '';
    const content = document.getElementById('workflowRunContent');
    content.innerHTML = `
        <div style="padding: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">图像描述</label>
            <textarea id="workflowPrompt" rows="4" placeholder="请输入您想要生成的图像描述，例如：一幅赛博朋克风格的城市夜景，霓虹灯闪烁，雨水反射着灯光..." style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; resize: vertical;"></textarea>
            <button class="btn btn-primary" style="margin-top: 20px; width: 100%;" onclick="generateImage()">
                <i class="fas fa-magic"></i> 生成图像
            </button>
        </div>
    `;
}

async function favoriteItem(itemId, type, button) {
    if (!state.user) {
        openModal('authModal');
        return;
    }
    
    try {
        const response = await mockFetch(`${API_BASE}/api/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ item_id: itemId, item_type: type })
        });
        
        const data = await response.json();
        
        if (button) {
            const icon = button.querySelector('i');
            if (icon) {
                if (data.favorited) {
                    // 已收藏 - 图标变黄
                    icon.style.color = '#eab308';
                    icon.classList.add('favorited');
                } else {
                    // 取消收藏 - 图标变白
                    icon.style.color = '';
                    icon.classList.remove('favorited');
                }
            }
        }
        
        // 如果当前在个人中心页面，刷新收藏数据
        if (state.currentPage === 'profile') {
            renderProfile();
        }
    } catch (error) {
        console.error('Favorite error:', error);
    }
}

function switchProfileTab(tab) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const content = document.getElementById('profileTabContent');
    const { artworks, workflows, favorites, likes } = state.profileData || {};
    
    let cardsHtml = '';
    let hasContent = false;
    
    if (tab === 'artworks') {
        if (artworks && artworks.length > 0) {
            cardsHtml = artworks.map(a => createArtworkCard(a)).join('');
            hasContent = true;
        } else {
            cardsHtml = createEmptyState('暂无作品', '点击"创作"按钮分享你的第一个作品');
        }
    } else if (tab === 'workflows') {
        if (workflows && workflows.length > 0) {
            cardsHtml = workflows.map(w => createWorkflowCard(w)).join('');
            hasContent = true;
        } else {
            cardsHtml = createEmptyState('暂无工作流', '开始创建你的第一个工作流吧');
        }
    } else if (tab === 'likes') {
        if (likes && likes.length > 0) {
            cardsHtml = likes.map(item => {
                // 根据 item_type 获取对应的内容
                if (item.item_type === 'artwork') {
                    const artwork = mockData.artworks.find(a => a.id === item.item_id);
                    return artwork ? createArtworkCard(artwork) : '';
                } else if (item.item_type === 'workflow') {
                    const workflow = mockData.workflows.find(w => w.id === item.item_id);
                    return workflow ? createWorkflowCard(workflow) : '';
                } else if (item.item_type === 'model') {
                    const model = mockData.models.find(m => m.id === item.item_id);
                    return model ? createModelCard(model) : '';
                }
                return '';
            }).join('');
            hasContent = true;
        } else {
            cardsHtml = createEmptyState('暂无点赞', '去发现更多精彩内容并点赞吧');
        }
    } else if (tab === 'favorites') {
        if (favorites && favorites.length > 0) {
            cardsHtml = favorites.map(item => {
                if (item.thumbnail) {
                    return createArtworkCard(item);
                } else if (item.cover_image) {
                    return createWorkflowCard(item);
                } else {
                    return '';
                }
            }).join('');
            hasContent = true;
        } else {
            cardsHtml = createEmptyState('暂无收藏', '去浏览发现更多精彩内容');
        }
    }
    
    content.innerHTML = `
        <div class="scroll-container">
            <button class="scroll-btn scroll-left" onclick="scrollContent('left')" style="display: none;">
                <span>&lt;</span>
            </button>
            <div class="card-scroll">
                <div class="card-grid">${cardsHtml}</div>
            </div>
            <button class="scroll-btn scroll-right" onclick="scrollContent('right')" style="display: none;">
                <span>&gt;</span>
            </button>
        </div>
    `;
    
    if (hasContent) {
        setTimeout(checkScrollButtons, 100);
    }
}

function scrollContent(direction) {
    const cardScroll = document.querySelector('.card-scroll');
    const scrollAmount = 350;
    
    if (direction === 'left') {
        cardScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        cardScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
    setTimeout(checkScrollButtons, 300);
}

function checkScrollButtons() {
    const cardScroll = document.querySelector('.card-scroll');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    
    if (!cardScroll || !leftBtn || !rightBtn) return;
    
    leftBtn.style.display = cardScroll.scrollLeft > 10 ? 'flex' : 'none';
    rightBtn.style.display = cardScroll.scrollLeft < cardScroll.scrollWidth - cardScroll.clientWidth - 10 ? 'flex' : 'none';
}

// 为滚动容器添加滚动事件监听
document.addEventListener('scroll', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('card-scroll')) {
        checkScrollButtons();
    }
}, true);

function filterWorkflows(category) {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadWorkflows(category);
}

function filterArtworks(type) {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadArtworks(type);
}

function filterModels(category) {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadModels(category);
}

async function loadUserWorkflowsForSelect() {
    try {
        const response = await mockFetch(`${API_BASE}/api/user/workflows`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const workflows = await response.json();
        
        const select = document.getElementById('workflowSelect');
        workflows.forEach(w => {
            select.innerHTML += `<option value="${w.id}">${w.title}</option>`;
        });
    } catch (error) {
        console.error('Load user workflows error:', error);
    }
}

async function submitArtwork() {
    const title = document.getElementById('artworkTitle').value;
    const description = document.getElementById('artworkDesc').value;
    const type = document.getElementById('artworkType').value;
    const workflowId = document.getElementById('workflowSelect').value;
    
    if (!title) {
        alert('请输入作品标题');
        return;
    }
    
    // 如果用户上传了图片，使用上传的图片；否则使用示例图片
    let imageUrl = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800';
    if (uploadedFile) {
        imageUrl = document.getElementById('previewImage').src;
    }
    
    try {
        const response = await mockFetch(`${API_BASE}/api/artworks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                title,
                description,
                type,
                url: imageUrl,
                thumbnail: imageUrl,
                workflow_id: workflowId || null
            })
        });
        
        if (response.ok) {
            alert('作品发布成功！');
            // 重置上传状态
            uploadedFile = null;
            router.navigate('profile');
        }
    } catch (error) {
        console.error('Submit artwork error:', error);
        alert('发布失败，请重试');
    }
}

function logout() {
    // 从 tokenMap 中移除当前 token 的映射
    const token = state.token;
    if (token) {
        const tokenMap = JSON.parse(localStorage.getItem('aicreate_token_map') || '{}');
        delete tokenMap[token];
        localStorage.setItem('aicreate_token_map', JSON.stringify(tokenMap));
    }
    
    localStorage.removeItem('token');
    state.token = null;
    state.user = null;
    updateUserMenu();
    router.navigate('home');
}

// 显示表单错误消息
function showFormError(formId, message) {
    let errorDiv = document.getElementById(formId + 'Error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = formId + 'Error';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 14px; margin-top: 12px; text-align: center;';
        document.getElementById(formId).appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// 事件监听
function setupEventListeners() {
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // 清除之前的错误消息
        const errorDiv = document.getElementById('loginFormError');
        if (errorDiv) errorDiv.style.display = 'none';
        
        try {
            const response = await mockFetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                state.token = data.token;
                state.user = data.user;
                localStorage.setItem('token', data.token);
                updateUserMenu();
                closeModal('authModal');
                router.navigate('home');
            } else {
                const errorData = await response.json();
                showFormError('loginForm', errorData.error || '登录失败，请检查邮箱和密码');
            }
        } catch (error) {
            console.error('Login error:', error);
            showFormError('loginForm', '登录失败，请稍后重试');
        }
    });
    
    // 注册表单
    document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // 清除之前的错误消息
        const errorDiv = document.getElementById('registerFormError');
        if (errorDiv) errorDiv.style.display = 'none';
        
        try {
            const response = await mockFetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                state.token = data.token;
                state.user = data.user;
                localStorage.setItem('token', data.token);
                updateUserMenu();
                closeModal('authModal');
                router.navigate('home');
            } else {
                const errorData = await response.json();
                showFormError('registerForm', errorData.error || '注册失败');
            }
        } catch (error) {
            console.error('Register error:', error);
            showFormError('registerForm', '注册失败，请稍后重试');
        }
    });
    
    // 全局搜索
    document.getElementById('globalSearch')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const search = e.target.value;
            if (search) {
                router.navigate('workflows');
                loadWorkflows('all', search);
            }
        }
    });
    
    // 点击弹窗外部关闭
    document.getElementById('authModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'authModal') {
            closeModal('authModal');
        }
    });
    
    // 设置表单提交
    document.getElementById('settingsForm')?.addEventListener('submit', saveSettings);
    
    // 设置弹窗外部点击关闭
    document.getElementById('settingsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeModal('settingsModal');
        }
    });
    
    // 头像上传
    document.getElementById('avatarFile')?.addEventListener('change', handleAvatarUpload);
    
    // 点击头像预览区域也可以选择图片
    document.getElementById('avatarPreview')?.addEventListener('click', () => {
        document.getElementById('avatarFile')?.click();
    });
}

// 渲染模型详情
async function renderModelDetail({ id }) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="loading" style="padding: 100px;"><div class="spinner"></div></div>`;
    
    try {
        const [modelRes, likesRes, favoritesRes] = await Promise.all([
            mockFetch(`${API_BASE}/api/models/${id}`),
            state.user ? mockFetch(`${API_BASE}/api/like`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
            state.user ? mockFetch(`${API_BASE}/api/favorites`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        ]);
        
        const model = await modelRes.json();
        const likes = state.user ? await likesRes.json() : [];
        const favorites = state.user ? await favoritesRes.json() : [];
        const isLiked = likes.some(l => l.item_id === id && l.item_type === 'model');
        const isFavorited = favorites.some(f => f.item_id === id && f.item_type === 'model');
        
        main.innerHTML = `
            <div class="model-detail">
                <button class="btn btn-outline mb-4" onclick="router.navigate('models')">
                    <i class="fas fa-arrow-left"></i> 返回模型库
                </button>
                
                <div class="model-main">
                    <div class="model-image-container">
                        <img src="${model.cover_image}" alt="${model.name}" class="model-image">
                    </div>
                    <div class="model-info">
                        <h1 class="model-title">${model.name}</h1>
                        <p style="color: var(--text-secondary); line-height: 1.8; font-size: 16px;">${model.description || '暂无描述'}</p>
                        <div class="tags">
                            <span class="tag">${model.category}</span>
                            <span class="tag">${model.type}</span>
                        </div>
                        <div class="model-stats">
                            <div class="model-stat">
                                <span class="model-stat-value">${model.likes.toLocaleString()}</span>
                                <span class="model-stat-label">点赞</span>
                            </div>
                            <div class="model-stat">
                                <span class="model-stat-value">${model.downloads.toLocaleString()}</span>
                                <span class="model-stat-label">下载</span>
                            </div>
                        </div>
                        <div class="model-actions">
                            <button class="btn btn-primary" onclick="downloadModel('${model.id}', '${model.name}')">
                                <i class="fas fa-download"></i> 下载模型
                            </button>
                            <button class="btn btn-outline" onclick="likeItem('${model.id}', 'model')">
                                <i class="fas fa-heart${isLiked ? ' liked' : ''}"${isLiked ? ' style="color: #ef4444;"' : ''}></i> 点赞
                            </button>
                            <button class="btn btn-outline favorite-btn" onclick="favoriteItem('${model.id}', 'model', this)">
                                <i class="fas fa-bookmark${isFavorited ? ' favorited' : ''}"${isFavorited ? ' style="color: #eab308;"' : ''}></i> 收藏
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="model-info-section">
                    <h3>模型信息</h3>
                    <div class="model-info-grid">
                        <div class="model-info-item">
                            <label>类别</label>
                            <value>${model.category}</value>
                        </div>
                        <div class="model-info-item">
                            <label>类型</label>
                            <value>${model.type}</value>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Load model detail error:', error);
        main.innerHTML = `<div class="error-state"><i class="fas fa-exclamation-triangle"></i><p>加载模型详情失败</p></div>`;
    }
}

// 渲染工作流详情
async function renderWorkflowDetail({ id }) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="loading" style="padding: 100px;"><div class="spinner"></div></div>`;
    
    try {
        const [workflowRes, likesRes, favoritesRes] = await Promise.all([
            mockFetch(`${API_BASE}/api/workflows/${id}`),
            state.user ? mockFetch(`${API_BASE}/api/like`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
            state.user ? mockFetch(`${API_BASE}/api/favorites`, { headers: { 'Authorization': `Bearer ${state.token}` } }) : Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        ]);
        
        const workflow = await workflowRes.json();
        const likes = state.user ? await likesRes.json() : [];
        const favorites = state.user ? await favoritesRes.json() : [];
        const isLiked = likes.some(l => l.item_id === id && l.item_type === 'workflow');
        const isFavorited = favorites.some(f => f.item_id === id && f.item_type === 'workflow');
        
        main.innerHTML = `
            <div class="artwork-detail">
                <div class="artwork-main">
                    <div class="artwork-image-container">
                        <img src="${workflow.cover_image}" alt="${workflow.title}" class="artwork-image">
                    </div>
                    <div class="artwork-info">
                        <h1 class="artwork-title">${workflow.title}</h1>
                        <div class="artwork-author">
                            <img src="${workflow.author_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${workflow.author_name}`}" alt="${workflow.author_name}">
                            <div>
                                <div style="font-weight: 600;">${workflow.author_name}</div>
                                <div style="color: var(--text-secondary); font-size: 14px;">${formatDate(workflow.created_at)}</div>
                            </div>
                        </div>
                        <p style="color: var(--text-secondary); line-height: 1.8;">${workflow.description || '暂无描述'}</p>
                        <div class="tags">
                            ${workflow.tags ? workflow.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('') : ''}
                        </div>
                        <div class="artwork-actions" style="margin-top: 24px;">
                            <button class="btn btn-primary" onclick="likeItem('${workflow.id}', 'workflow')">
                                <i class="fas fa-heart${isLiked ? ' liked' : ''}"${isLiked ? ' style="color: #ef4444;"' : ''}></i> ${workflow.likes} 点赞
                            </button>
                            <button class="btn btn-outline favorite-btn" onclick="favoriteItem('${workflow.id}', 'workflow', this)">
                                <i class="fas fa-bookmark${isFavorited ? ' favorited' : ''}"${isFavorited ? ' style="color: #eab308;"' : ''}></i> 收藏
                            </button>
                            <button class="btn btn-outline" onclick="runWorkflow('${workflow.id}')">
                                <i class="fas fa-play"></i> 运行工作流
                            </button>
                        </div>
                        <div style="margin-top: 24px; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius-md);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <span style="color: var(--text-secondary);">浏览量</span>
                                <span style="font-weight: 600;">${workflow.views}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-secondary);">分类</span>
                                <span style="font-weight: 600;">${workflow.category || '未分类'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Load workflow detail error:', error);
        main.innerHTML = createEmptyState('加载失败', '工作流不存在或已删除');
    }
}
