/**
 * AICreate AI创作平台 - 后端服务器
 * 
 * 技术栈: Express.js + SQLite + JWT
 * 功能: 工作流管理、作品管理、模型管理、用户认证、数据统计
 */

// 依赖导入
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 应用配置
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ai-creative-platform-secret-key';

// 中间件配置
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 数据库初始化
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
  } else {
    console.log('数据库连接成功');
  }
});

db.serialize(() => {
  // 用户表
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 工作流表
  db.run(`CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    tags TEXT,
    cover_image TEXT,
    workflow_data TEXT,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // 作品表
  db.run(`CREATE TABLE IF NOT EXISTS artworks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    workflow_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'image',
    url TEXT NOT NULL,
    thumbnail TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
  )`);

  // 模型表
  db.run(`CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT,
    cover_image TEXT,
    download_url TEXT,
    likes INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 评论表
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    artwork_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artwork_id) REFERENCES artworks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // 收藏表
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // 插入示例数据
  insertSampleData();
});

function insertSampleData() {
  // 检查是否已有数据
  db.get('SELECT COUNT(*) as count FROM workflows', (err, row) => {
    if (err || row.count > 0) return;

    const userId = uuidv4();
    
    // 插入示例用户
    db.run(`INSERT INTO users (id, username, email, password, avatar, bio) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'admin', 'admin@example.com', bcrypt.hashSync('admin123', 10), 
       'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', 'AI创作者']);

    // 插入示例工作流
    const workflows = [
      {
        id: uuidv4(),
        user_id: userId,
        title: 'Stable Diffusion 文生图工作流',
        description: '使用Stable Diffusion生成高质量图片的ComfyUI工作流',
        category: '图像生成',
        tags: 'SD,文生图,ComfyUI',
        cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        likes: 128,
        views: 1024
      },
      {
        id: uuidv4(),
        user_id: userId,
        title: 'Flux 高清图像生成',
        description: '基于Flux模型的超高清图像生成工作流',
        category: '图像生成',
        tags: 'Flux,高清,AI绘画',
        cover_image: 'https://images.unsplash.com/photo-1686191128892-3b37add4a934?w=400',
        likes: 256,
        views: 2048
      },
      {
        id: uuidv4(),
        user_id: userId,
        title: 'CogVideo 视频生成',
        description: '文本生成视频的完整工作流配置',
        category: '视频生成',
        tags: 'CogVideo,视频,文生视频',
        cover_image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
        likes: 89,
        views: 756
      }
    ];

    workflows.forEach(wf => {
      db.run(`INSERT INTO workflows (id, user_id, title, description, category, tags, cover_image, likes, views) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [wf.id, wf.user_id, wf.title, wf.description, wf.category, wf.tags, wf.cover_image, wf.likes, wf.views]);
    });

    // 插入示例作品
    const artworks = [
      {
        id: uuidv4(),
        user_id: userId,
        title: '未来城市概念图',
        description: '使用AI生成的赛博朋克风格未来城市',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
        likes: 342
      },
      {
        id: uuidv4(),
        user_id: userId,
        title: '梦幻森林',
        description: '童话风格的梦幻森林场景',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400',
        likes: 189
      },
      {
        id: uuidv4(),
        user_id: userId,
        title: 'AI肖像艺术',
        description: '抽象风格的AI人物肖像',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400',
        likes: 567
      }
    ];

    artworks.forEach(art => {
      db.run(`INSERT INTO artworks (id, user_id, title, description, type, url, thumbnail, likes) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [art.id, art.user_id, art.title, art.description, art.type, art.url, art.thumbnail, art.likes]);
    });

    // 插入示例模型
    const models = [
      {
        id: uuidv4(),
        name: 'Stable Diffusion XL',
        description: '高质量的文本到图像生成模型',
        category: '图像生成',
        type: 'checkpoint',
        cover_image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400',
        likes: 1024,
        downloads: 5000
      },
      {
        id: uuidv4(),
        name: 'Flux Dev',
        description: 'Black Forest Labs推出的高质量图像生成模型',
        category: '图像生成',
        type: 'checkpoint',
        cover_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        likes: 892,
        downloads: 3200
      },
      {
        id: uuidv4(),
        name: 'CogVideoX',
        description: '文本到视频生成模型',
        category: '视频生成',
        type: 'model',
        cover_image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
        likes: 456,
        downloads: 1800
      }
    ];

    models.forEach(model => {
      db.run(`INSERT INTO models (id, name, description, category, type, cover_image, likes, downloads) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [model.id, model.name, model.description, model.category, model.type, model.cover_image, model.likes, model.downloads]);
    });
  });
}

// JWT验证中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    req.userId = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.userId = null;
    } else {
      req.userId = user.id;
    }
    next();
  });
};

// ===== API路由 =====

// 用户注册
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    
    db.run(`INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`,
      [id, username, email, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ error: '用户名或邮箱已存在' });
        }
        const token = jwt.sign({ id, username }, JWT_SECRET);
        res.json({ token, user: { id, username, email } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: '注册失败' });
  }
});

// 用户登录
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        avatar: user.avatar,
        bio: user.bio
      } 
    });
  });
});

// 获取当前用户
app.get('/api/auth/me', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  db.get(`SELECT id, username, email, avatar, bio FROM users WHERE id = ?`, [req.userId], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
  });
});

// 获取工作流列表
app.get('/api/workflows', (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  let sql = `SELECT w.*, u.username as author_name, u.avatar as author_avatar 
             FROM workflows w 
             JOIN users u ON w.user_id = u.id`;
  let params = [];
  
  if (category) {
    sql += ` WHERE w.category = ?`;
    params.push(category);
  }
  
  if (search) {
    sql += params.length > 0 ? ` AND` : ` WHERE`;
    sql += ` (w.title LIKE ? OR w.description LIKE ? OR w.tags LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  
  sql += ` ORDER BY w.created_at DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
  
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 获取单个工作流
app.get('/api/workflows/:id', (req, res) => {
  db.get(`SELECT w.*, u.username as author_name, u.avatar as author_avatar 
          FROM workflows w 
          JOIN users u ON w.user_id = u.id 
          WHERE w.id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: '工作流不存在' });
    
    // 增加浏览量
    db.run(`UPDATE workflows SET views = views + 1 WHERE id = ?`, [req.params.id]);
    res.json(row);
  });
});

// 创建工作流
app.post('/api/workflows', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const { title, description, category, tags, cover_image, workflow_data } = req.body;
  const id = uuidv4();
  
  db.run(`INSERT INTO workflows (id, user_id, title, description, category, tags, cover_image, workflow_data) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, req.userId, title, description, category, tags, cover_image, workflow_data],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, message: '工作流创建成功' });
    }
  );
});

// 获取作品列表
app.get('/api/artworks', (req, res) => {
  const { type, search, page = 1, limit = 12 } = req.query;
  let sql = `SELECT a.*, u.username as author_name, u.avatar as author_avatar 
             FROM artworks a 
             JOIN users u ON a.user_id = u.id`;
  let params = [];
  
  if (type) {
    sql += ` WHERE a.type = ?`;
    params.push(type);
  }
  
  if (search) {
    sql += params.length > 0 ? ` AND` : ` WHERE`;
    sql += ` (a.title LIKE ? OR a.description LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }
  
  sql += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
  
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 获取单个作品
app.get('/api/artworks/:id', (req, res) => {
  db.get(`SELECT a.*, u.username as author_name, u.avatar as author_avatar 
          FROM artworks a 
          JOIN users u ON a.user_id = u.id 
          WHERE a.id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: '作品不存在' });
    res.json(row);
  });
});

// 创建作品
app.post('/api/artworks', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const { title, description, type, url, thumbnail, workflow_id } = req.body;
  const id = uuidv4();
  
  db.run(`INSERT INTO artworks (id, user_id, workflow_id, title, description, type, url, thumbnail) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, req.userId, workflow_id, title, description, type, url, thumbnail],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, message: '作品创建成功' });
    }
  );
});

// 获取模型列表
app.get('/api/models', (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  let sql = `SELECT * FROM models`;
  let params = [];
  
  if (category) {
    sql += ` WHERE category = ?`;
    params.push(category);
  }
  
  if (search) {
    sql += params.length > 0 ? ` AND` : ` WHERE`;
    sql += ` (name LIKE ? OR description LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }
  
  sql += ` ORDER BY downloads DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
  
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 获取评论列表
app.get('/api/artworks/:id/comments', (req, res) => {
  db.all(`SELECT c.*, u.username, u.avatar 
          FROM comments c 
          JOIN users u ON c.user_id = u.id 
          WHERE c.artwork_id = ? 
          ORDER BY c.created_at DESC`, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 添加评论
app.post('/api/artworks/:id/comments', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const { content } = req.body;
  const id = uuidv4();
  
  db.run(`INSERT INTO comments (id, artwork_id, user_id, content) VALUES (?, ?, ?, ?)`,
    [id, req.params.id, req.userId, content],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // 更新作品评论数
      db.run(`UPDATE artworks SET comments = comments + 1 WHERE id = ?`, [req.params.id]);
      res.json({ id, message: '评论添加成功' });
    }
  );
});

// 点赞功能
app.post('/api/like', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const { item_id, item_type } = req.body;
  const table = item_type === 'workflow' ? 'workflows' : 'artworks';
  
  db.run(`UPDATE ${table} SET likes = likes + 1 WHERE id = ?`, [item_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '点赞成功' });
  });
});

// 收藏功能
app.post('/api/favorites', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const { item_id, item_type } = req.body;
  const id = uuidv4();
  
  db.run(`INSERT INTO favorites (id, user_id, item_id, item_type) VALUES (?, ?, ?, ?)`,
    [id, req.userId, item_id, item_type],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '收藏成功' });
    }
  );
});

// 获取用户收藏
app.get('/api/favorites', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  db.all(`SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC`, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 获取用户统计数据
app.get('/api/user/stats', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  const stats = {};
  
  db.get(`SELECT COUNT(*) as count FROM artworks WHERE user_id = ?`, [req.userId], (err, row) => {
    stats.artworks = row.count;
    
    db.get(`SELECT COUNT(*) as count FROM workflows WHERE user_id = ?`, [req.userId], (err, row) => {
      stats.workflows = row.count;
      
      db.get(`SELECT COUNT(*) as count FROM favorites WHERE user_id = ?`, [req.userId], (err, row) => {
        stats.favorites = row.count;
        res.json(stats);
      });
    });
  });
});

// 获取用户作品
app.get('/api/user/artworks', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  db.all(`SELECT * FROM artworks WHERE user_id = ? ORDER BY created_at DESC`, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 获取用户工作流
app.get('/api/user/workflows', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  db.all(`SELECT * FROM workflows WHERE user_id = ? ORDER BY created_at DESC`, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ===== 数据可视化API =====

// 获取平台总览统计
app.get('/api/stats/overview', (req, res) => {
  const stats = {};
  
  db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
    stats.users = row.count;
    
    db.get(`SELECT COUNT(*) as count FROM workflows`, (err, row) => {
      stats.workflows = row.count;
      
      db.get(`SELECT COUNT(*) as count FROM artworks`, (err, row) => {
        stats.artworks = row.count;
        
        db.get(`SELECT COUNT(*) as count FROM models`, (err, row) => {
          stats.models = row.count;
          
          db.get(`SELECT SUM(likes) as total FROM workflows`, (err, row) => {
            stats.totalWorkflowLikes = row.total || 0;
            
            db.get(`SELECT SUM(likes) as total FROM artworks`, (err, row) => {
              stats.totalArtworkLikes = row.total || 0;
              
              db.get(`SELECT SUM(views) as total FROM workflows`, (err, row) => {
                stats.totalWorkflowViews = row.total || 0;
                
                res.json(stats);
              });
            });
          });
        });
      });
    });
  });
});

// 获取分类统计
app.get('/api/stats/categories', (req, res) => {
  const stats = {};
  
  db.all(`SELECT category, COUNT(*) as count FROM workflows GROUP BY category`, (err, rows) => {
    stats.workflowCategories = rows;
    
    db.all(`SELECT type, COUNT(*) as count FROM artworks GROUP BY type`, (err, rows) => {
      stats.artworkTypes = rows;
      
      db.all(`SELECT category, COUNT(*) as count FROM models GROUP BY category`, (err, rows) => {
        stats.modelCategories = rows;
        
        res.json(stats);
      });
    });
  });
});

// 获取趋势数据（按日期统计）
app.get('/api/stats/trends', (req, res) => {
  const { days = 7 } = req.query;
  
  db.all(`
    SELECT DATE(created_at) as date, COUNT(*) as count 
    FROM workflows 
    WHERE created_at >= DATE('now', '-${days} days')
    GROUP BY DATE(created_at)
    ORDER BY date
  `, (err, workflowRows) => {
    const workflowData = workflowRows;
    
    db.all(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM artworks 
      WHERE created_at >= DATE('now', '-${days} days')
      GROUP BY DATE(created_at)
      ORDER BY date
    `, (err, artworkRows) => {
      const artworkData = artworkRows;
      
      db.all(`
        SELECT DATE(created_at) as date, COUNT(*) as count 
        FROM users 
        WHERE created_at >= DATE('now', '-${days} days')
        GROUP BY DATE(created_at)
        ORDER BY date
      `, (err, userRows) => {
        const userData = userRows;
        
        // 合并数据，确保每个日期都有数据
        const allDates = new Set([
          ...workflowData.map(d => d.date),
          ...artworkData.map(d => d.date),
          ...userData.map(d => d.date)
        ]);
        
        const result = Array.from(allDates).sort().map(date => ({
          date,
          workflows: workflowData.find(d => d.date === date)?.count || 0,
          artworks: artworkData.find(d => d.date === date)?.count || 0,
          users: userData.find(d => d.date === date)?.count || 0
        }));
        
        res.json(result);
      });
    });
  });
});

// 获取热门内容排行
app.get('/api/stats/popular', (req, res) => {
  const stats = {};
  
  db.all(`
    SELECT title, likes, views 
    FROM workflows 
    ORDER BY likes DESC 
    LIMIT 5
  `, (err, rows) => {
    stats.topWorkflows = rows;
    
    db.all(`
      SELECT title, likes 
      FROM artworks 
      ORDER BY likes DESC 
      LIMIT 5
    `, (err, rows) => {
      stats.topArtworks = rows;
      
      db.all(`
        SELECT name, downloads, likes 
        FROM models 
        ORDER BY downloads DESC 
        LIMIT 5
      `, (err, rows) => {
        stats.topModels = rows;
        
        res.json(stats);
      });
    });
  });
});

// 获取用户活跃度统计
app.get('/api/stats/activity', authenticateToken, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: '未登录' });
  }
  
  db.all(`
    SELECT DATE(created_at) as date, COUNT(*) as count 
    FROM artworks 
    WHERE user_id = ? AND created_at >= DATE('now', '-30 days')
    GROUP BY DATE(created_at)
    ORDER BY date
  `, [req.userId], (err, artworkRows) => {
    const artworkData = artworkRows;
    
    db.all(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM workflows 
      WHERE user_id = ? AND created_at >= DATE('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date
    `, [req.userId], (err, workflowRows) => {
      const workflowData = workflowRows;
      
      const allDates = new Set([
        ...artworkData.map(d => d.date),
        ...workflowData.map(d => d.date)
      ]);
      
      const result = Array.from(allDates).sort().map(date => ({
        date,
        artworks: artworkData.find(d => d.date === date)?.count || 0,
        workflows: workflowData.find(d => d.date === date)?.count || 0
      }));
      
      res.json(result);
    });
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`AI创作平台服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
