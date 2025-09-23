// 企业级多智能体管理平台核心逻辑

class MultiAgentPlatform {
    constructor() {
        this.agents = new Map();
        this.tasks = new Map();
        this.workflows = new Map();
        this.apiBaseUrl = 'https://api.multiagent-platform.com/v1'; // 模拟API地址
        this.websocket = null;
        this.charts = {};
        this.editor = null;

        this.init();
    }

    async init() {
        this.setupNavigation();
        this.setupToolbar();
        this.setupWebSocket();
        this.initializeMonacoEditor();
        this.loadInitialData();
        this.startRealTimeUpdates();
    }

    // 导航系统
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');
        const breadcrumb = document.getElementById('current-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // 移除活跃状态
                navItems.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // 添加活跃状态
                item.classList.add('active');
                const targetSection = item.dataset.section;
                const targetElement = document.getElementById(targetSection);

                if (targetElement) {
                    targetElement.classList.add('active');
                    breadcrumb.textContent = item.querySelector('span').textContent;

                    // 根据页面类型执行特定初始化
                    this.handleSectionChange(targetSection);
                }
            });
        });
    }

    // 工具栏设置
    setupToolbar() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // 通知按钮
        const notificationBtn = document.querySelector('.notification-btn');
        notificationBtn.addEventListener('click', () => {
            this.showNotifications();
        });
    }

    // WebSocket连接
    setupWebSocket() {
        try {
            // 模拟WebSocket连接
            this.websocket = {
                send: (data) => console.log('WebSocket发送:', data),
                close: () => console.log('WebSocket关闭'),
                onmessage: null,
                onopen: null,
                onclose: null
            };

            // 模拟连接成功
            setTimeout(() => {
                console.log('WebSocket连接成功');
                this.updateSystemStatus('online');
            }, 1000);

        } catch (error) {
            console.error('WebSocket连接失败:', error);
            this.updateSystemStatus('offline');
        }
    }

    // Monaco编辑器初始化
    initializeMonacoEditor() {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});

        require(['vs/editor/editor.main'], () => {
            // 注册DSL语言
            monaco.languages.register({ id: 'dsl' });

            // DSL语法高亮
            monaco.languages.setMonarchTokensProvider('dsl', {
                tokenizer: {
                    root: [
                        [/\b(agent|task|workflow|spawn|contract|route|gather|emit)\b/, 'keyword'],
                        [/\b(capabilities|load_threshold|parties|sla|response_time|availability)\b/, 'property'],
                        [/".*?"/, 'string'],
                        [/\/\/.*/, 'comment'],
                        [/\d+/, 'number']
                    ]
                }
            });

            // 创建编辑器实例
            this.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: this.getDefaultDSLCode(),
                language: 'dsl',
                theme: 'vs',
                automaticLayout: true,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line'
            });

            // 编辑器事件监听
            this.editor.onDidChangeModelContent(() => {
                this.validateDSLCode();
            });
        });
    }

    // 获取默认DSL代码
    getDefaultDSLCode() {
        return `# 企业级任务调度系统
# 这是一个真实的多智能体协作配置

agent TaskScheduler {
    capabilities: ["task_distribution", "load_balancing", "priority_management"]
    max_concurrent_tasks: 50
    load_threshold: 0.85

    sla: {
        response_time: "100ms"
        availability: "99.9%"
        throughput: "1000 tasks/minute"
    }
}

agent DataProcessor {
    capabilities: ["data_transformation", "batch_processing", "stream_processing"]
    max_concurrent_tasks: 30
    load_threshold: 0.75

    dependencies: ["database_service", "cache_service"]
}

agent QualityController {
    capabilities: ["validation", "quality_assurance", "error_handling"]
    max_concurrent_tasks: 20
    load_threshold: 0.60
}

# 定义工作流
workflow DataProcessingPipeline {
    agents: [TaskScheduler, DataProcessor, QualityController]
    coordination_model: "HCMPL_hierarchical"
    learning_mode: "CALK_collaborative"

    stages: [
        "data_ingestion",
        "data_validation",
        "data_transformation",
        "quality_check",
        "data_output"
    ]
}

# 执行任务分配
task process_customer_data {
    input: customer_dataset
    priority: "high"
    deadline: "30 minutes"

    route to TaskScheduler
    validate with QualityController
    process with DataProcessor
}

# 收集结果并生成报告
gather results from [TaskScheduler, DataProcessor, QualityController]
on completion {
    generate_report(results)
    notify_stakeholders(report)
    update_metrics(performance_data)
}`;
    }

    // 处理页面切换
    handleSectionChange(section) {
        switch (section) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'agents':
                this.loadAgentsData();
                break;
            case 'dsl-editor':
                if (this.editor) {
                    this.editor.layout();
                }
                break;
            case 'monitoring':
                this.initializeMonitoring();
                break;
        }
    }

    // 初始化仪表板
    initializeDashboard() {
        this.updateStatistics();
        this.initializeCharts();
        this.loadRecentActivity();
    }

    // 更新统计数据
    updateStatistics() {
        // 模拟实时数据更新
        const stats = {
            activeAgents: Math.floor(Math.random() * 5) + 20,
            runningTasks: Math.floor(Math.random() * 20) + 140,
            throughput: (Math.random() * 0.5 + 2.0).toFixed(1) + 'K',
            resourceUsage: Math.floor(Math.random() * 15) + 60
        };

        document.getElementById('active-agents').textContent = stats.activeAgents;
        document.getElementById('running-tasks').textContent = stats.runningTasks;
        document.getElementById('throughput').textContent = stats.throughput;
        document.getElementById('resource-usage').textContent = stats.resourceUsage + '%';
    }

    // 初始化图表
    initializeCharts() {
        // 性能监控图表
        const performanceCtx = document.getElementById('performance-chart');
        if (performanceCtx) {
            this.charts.performance = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: this.generateTimeLabels(),
                    datasets: [{
                        label: 'CPU使用率 (%)',
                        data: this.generateRandomData(),
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        fill: true,
                        tension: 0.4
                    }, {
                        label: '内存使用率 (%)',
                        data: this.generateRandomData(),
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // 智能体状态分布图表
        const agentStatusCtx = document.getElementById('agent-status-chart');
        if (agentStatusCtx) {
            this.charts.agentStatus = new Chart(agentStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['在线', '忙碌', '离线', '维护中'],
                    datasets: [{
                        data: [18, 6, 2, 1],
                        backgroundColor: [
                            '#4caf50',
                            '#ff9800',
                            '#9e9e9e',
                            '#f44336'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // 生成时间标签
    generateTimeLabels() {
        const labels = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 5 * 60 * 1000);
            labels.push(time.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            }));
        }
        return labels;
    }

    // 生成随机数据
    generateRandomData() {
        return Array.from({length: 12}, () => Math.floor(Math.random() * 40) + 30);
    }

    // 加载最近活动
    loadRecentActivity() {
        const activities = [
            {
                type: 'agent',
                icon: 'fas fa-robot',
                title: '智能体 DataProcessor-03 上线',
                description: '成功连接到集群，开始处理任务队列',
                time: '2分钟前',
                color: '#4caf50'
            },
            {
                type: 'task',
                icon: 'fas fa-tasks',
                title: '批量数据处理任务完成',
                description: '处理了 1,247 条客户记录，用时 45 秒',
                time: '5分钟前',
                color: '#2196f3'
            },
            {
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                title: '系统负载警告',
                description: 'CPU使用率达到 85%，建议优化任务分配',
                time: '8分钟前',
                color: '#ff9800'
            },
            {
                type: 'success',
                icon: 'fas fa-check-circle',
                title: '工作流部署成功',
                description: 'CustomerDataPipeline 工作流已成功部署',
                time: '12分钟前',
                color: '#4caf50'
            },
            {
                type: 'agent',
                icon: 'fas fa-robot',
                title: '智能体协作优化',
                description: 'HCMPL算法优化了任务分配策略',
                time: '15分钟前',
                color: '#667eea'
            }
        ];

        const activityList = document.getElementById('activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon" style="background-color: ${activity.color}">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <h4>${activity.title}</h4>
                        <p>${activity.description}</p>
                    </div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `).join('');
        }
    }

    // 加载智能体数据
    loadAgentsData() {
        const agentsList = [
            {
                id: 'agent-001',
                name: 'TaskScheduler-01',
                type: '任务调度器',
                status: 'online',
                cpuUsage: 45,
                memoryUsage: 67,
                tasksProcessed: 156,
                uptime: '72小时'
            },
            {
                id: 'agent-002',
                name: 'DataProcessor-01',
                type: '数据处理器',
                status: 'online',
                cpuUsage: 78,
                memoryUsage: 52,
                tasksProcessed: 89,
                uptime: '48小时'
            },
            {
                id: 'agent-003',
                name: 'QualityController-01',
                type: '质量控制器',
                status: 'online',
                cpuUsage: 23,
                memoryUsage: 34,
                tasksProcessed: 67,
                uptime: '96小时'
            },
            {
                id: 'agent-004',
                name: 'APIGateway-01',
                type: 'API网关',
                status: 'online',
                cpuUsage: 56,
                memoryUsage: 45,
                tasksProcessed: 234,
                uptime: '120小时'
            }
        ];

        const agentsGrid = document.getElementById('agents-grid');
        if (agentsGrid) {
            agentsGrid.innerHTML = agentsList.map(agent => `
                <div class="agent-card" data-agent-id="${agent.id}">
                    <div class="agent-header">
                        <div class="agent-info">
                            <div class="agent-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="agent-details">
                                <h3>${agent.name}</h3>
                                <p>${agent.type}</p>
                            </div>
                        </div>
                        <span class="agent-status ${agent.status}">
                            ${agent.status === 'online' ? '在线' : '离线'}
                        </span>
                    </div>

                    <div class="agent-metrics">
                        <div class="metric">
                            <div class="metric-value">${agent.cpuUsage}%</div>
                            <div class="metric-label">CPU</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${agent.memoryUsage}%</div>
                            <div class="metric-label">内存</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${agent.tasksProcessed}</div>
                            <div class="metric-label">任务数</div>
                        </div>
                    </div>

                    <div class="agent-actions">
                        <button class="btn btn-small primary" onclick="platform.controlAgent('${agent.id}', 'restart')">
                            <i class="fas fa-redo"></i> 重启
                        </button>
                        <button class="btn btn-small secondary" onclick="platform.viewAgentDetails('${agent.id}')">
                            <i class="fas fa-eye"></i> 详情
                        </button>
                        <button class="btn btn-small secondary" onclick="platform.configureAgent('${agent.id}')">
                            <i class="fas fa-cog"></i> 配置
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // 智能体控制
    async controlAgent(agentId, action) {
        try {
            const response = await this.apiCall(`/agents/${agentId}/control`, {
                method: 'POST',
                body: { action }
            });

            if (response.success) {
                this.showNotification(`智能体 ${agentId} ${action} 操作成功`, 'success');
                this.loadAgentsData(); // 刷新数据
            }
        } catch (error) {
            this.showNotification(`操作失败: ${error.message}`, 'error');
        }
    }

    // 查看智能体详情
    viewAgentDetails(agentId) {
        this.openModal('智能体详情', `
            <div class="agent-detail-view">
                <h4>智能体 ${agentId} 详细信息</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>状态:</label>
                        <span class="status-badge online">运行中</span>
                    </div>
                    <div class="detail-item">
                        <label>运行时间:</label>
                        <span>72小时 45分钟</span>
                    </div>
                    <div class="detail-item">
                        <label>处理任务:</label>
                        <span>156 个任务</span>
                    </div>
                    <div class="detail-item">
                        <label>平均响应时间:</label>
                        <span>85ms</span>
                    </div>
                </div>

                <h5>实时监控</h5>
                <div class="monitoring-mini">
                    <canvas id="agent-detail-chart" width="400" height="200"></canvas>
                </div>

                <h5>最近任务</h5>
                <div class="recent-tasks">
                    <div class="task-item">
                        <span>数据处理任务 #2341</span>
                        <span class="task-status success">已完成</span>
                    </div>
                    <div class="task-item">
                        <span>质量检查任务 #2342</span>
                        <span class="task-status running">进行中</span>
                    </div>
                </div>
            </div>
        `);
    }

    // DSL代码验证
    validateDSLCode() {
        if (!this.editor) return;

        const code = this.editor.getValue();
        const errors = [];

        // 简单的语法验证
        const lines = code.split('\n');
        lines.forEach((line, index) => {
            if (line.trim() && !line.startsWith('#')) {
                // 检查基本语法错误
                if (line.includes('{') && !line.includes('}') && !lines[index + 1]?.includes('}')) {
                    // 可能需要检查括号匹配
                }
            }
        });

        // 更新错误显示
        const errorsContent = document.getElementById('errors-content');
        if (errorsContent) {
            if (errors.length > 0) {
                errorsContent.innerHTML = errors.map(error =>
                    `<div class="error-item">${error}</div>`
                ).join('');
            } else {
                errorsContent.innerHTML = '<div class="success-message">代码语法正确</div>';
            }
        }
    }

    // 运行DSL代码
    async runDSLCode() {
        if (!this.editor) return;

        const code = this.editor.getValue();
        const outputContent = document.getElementById('output-content');
        const logsContent = document.getElementById('logs-content');

        if (outputContent) {
            outputContent.innerHTML = '<div class="loading">正在执行DSL程序...</div>';
        }

        try {
            // 模拟API调用执行DSL代码
            const response = await this.apiCall('/dsl/execute', {
                method: 'POST',
                body: { code }
            });

            if (outputContent) {
                outputContent.innerHTML = `
                    <div class="execution-result success">
                        <h4>执行成功</h4>
                        <div class="result-summary">
                            <p>✅ 已创建 3 个智能体</p>
                            <p>✅ 已部署 1 个工作流</p>
                            <p>✅ 已分配 1 个任务</p>
                        </div>
                        <div class="execution-metrics">
                            <div class="metric">
                                <span class="label">执行时间:</span>
                                <span class="value">1.2秒</span>
                            </div>
                            <div class="metric">
                                <span class="label">内存使用:</span>
                                <span class="value">45MB</span>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (logsContent) {
                logsContent.innerHTML = `
                    <div class="log-entry">
                        <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
                        <span class="level info">INFO</span>
                        <span class="message">开始解析DSL代码...</span>
                    </div>
                    <div class="log-entry">
                        <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
                        <span class="level info">INFO</span>
                        <span class="message">创建智能体 TaskScheduler...</span>
                    </div>
                    <div class="log-entry">
                        <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
                        <span class="level info">INFO</span>
                        <span class="message">创建智能体 DataProcessor...</span>
                    </div>
                    <div class="log-entry">
                        <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
                        <span class="level success">SUCCESS</span>
                        <span class="message">所有智能体创建完成</span>
                    </div>
                `;
            }

        } catch (error) {
            if (outputContent) {
                outputContent.innerHTML = `
                    <div class="execution-result error">
                        <h4>执行失败</h4>
                        <p class="error-message">${error.message}</p>
                    </div>
                `;
            }
        }
    }

    // API调用模拟
    async apiCall(endpoint, options = {}) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

        // 模拟API响应
        if (Math.random() > 0.1) { // 90%成功率
            return {
                success: true,
                data: options.body || {},
                timestamp: new Date().toISOString()
            };
        } else {
            throw new Error('网络连接超时');
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' :
                                type === 'error' ? 'exclamation-circle' :
                                'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // 添加到页面
        document.body.appendChild(notification);

        // 自动移除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // 更新系统状态
    updateSystemStatus(status) {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = statusIndicator.nextElementSibling;

        if (status === 'online') {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = '系统在线';
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = '系统离线';
        }
    }

    // 打开模态对话框
    openModal(title, content) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }

    // 关闭模态对话框
    closeModal() {
        const modal = document.getElementById('modal-overlay');
        modal.classList.remove('active');
    }

    // 启动实时更新
    startRealTimeUpdates() {
        // 每30秒更新一次统计数据
        setInterval(() => {
            if (document.getElementById('dashboard').classList.contains('active')) {
                this.updateStatistics();
                this.updateCharts();
            }
        }, 30000);

        // 每5秒更新一次活动日志
        setInterval(() => {
            if (document.getElementById('dashboard').classList.contains('active')) {
                this.addRandomActivity();
            }
        }, 5000);
    }

    // 更新图表数据
    updateCharts() {
        if (this.charts.performance) {
            // 移除第一个数据点，添加新的数据点
            this.charts.performance.data.datasets.forEach(dataset => {
                dataset.data.shift();
                dataset.data.push(Math.floor(Math.random() * 40) + 30);
            });

            // 更新时间标签
            this.charts.performance.data.labels.shift();
            this.charts.performance.data.labels.push(
                new Date().toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            );

            this.charts.performance.update('none');
        }
    }

    // 添加随机活动
    addRandomActivity() {
        const activities = [
            '智能体 DataProcessor-04 开始处理新任务',
            '任务队列中添加了 15 个新任务',
            '系统自动扩容，新增 2 个处理节点',
            '完成客户数据分析，生成报告',
            '检测到系统性能优化机会'
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const activityList = document.getElementById('activity-list');

        if (activityList && activityList.children.length > 0) {
            // 添加新活动到顶部
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <div class="activity-icon" style="background-color: #667eea">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="activity-content">
                    <h4>${randomActivity}</h4>
                    <p>系统自动执行</p>
                </div>
                <div class="activity-time">刚刚</div>
            `;

            activityList.insertBefore(newActivity, activityList.firstChild);

            // 保持最多5个活动
            if (activityList.children.length > 5) {
                activityList.removeChild(activityList.lastChild);
            }
        }
    }

    // 初始化数据加载
    async loadInitialData() {
        try {
            // 模拟加载配置数据
            console.log('正在加载平台配置...');

            // 模拟加载智能体数据
            console.log('正在加载智能体信息...');

            // 模拟加载任务数据
            console.log('正在加载任务队列...');

            console.log('平台初始化完成');
        } catch (error) {
            console.error('初始化失败:', error);
            this.showNotification('平台初始化失败，请刷新页面重试', 'error');
        }
    }
}

// 全局函数
function createNewAgent() {
    platform.openModal('创建新智能体', `
        <form id="create-agent-form">
            <div class="form-group">
                <label>智能体名称</label>
                <input type="text" name="name" placeholder="例如: DataProcessor-05" required>
            </div>
            <div class="form-group">
                <label>智能体类型</label>
                <select name="type" required>
                    <option value="">选择类型...</option>
                    <option value="task_scheduler">任务调度器</option>
                    <option value="data_processor">数据处理器</option>
                    <option value="quality_controller">质量控制器</option>
                    <option value="api_gateway">API网关</option>
                </select>
            </div>
            <div class="form-group">
                <label>能力配置</label>
                <textarea name="capabilities" placeholder="输入智能体的能力列表..." rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn secondary" onclick="platform.closeModal()">取消</button>
                <button type="submit" class="btn primary">创建智能体</button>
            </div>
        </form>
    `);
}

function deployWorkflow() {
    platform.showNotification('工作流部署功能正在开发中...', 'info');
}

function runDiagnostic() {
    platform.showNotification('正在运行系统诊断...', 'info');
    setTimeout(() => {
        platform.showNotification('系统诊断完成，一切正常', 'success');
    }, 3000);
}

function importAgents() {
    platform.showNotification('批量导入功能正在开发中...', 'info');
}

function runDSLCode() {
    platform.runDSLCode();
}

function saveDSLCode() {
    platform.showNotification('DSL代码已保存', 'success');
}

function loadTemplate() {
    platform.showNotification('请从下拉菜单选择模板', 'info');
}

function loadSelectedTemplate() {
    const selector = document.getElementById('template-selector');
    const template = selector.value;

    if (template && platform.editor) {
        // 这里可以加载不同的模板代码
        platform.showNotification(`已加载${selector.selectedOptions[0].text}`, 'success');
    }
}

function closeModal() {
    platform.closeModal();
}

// 标签页切换
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // 移除所有活跃状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 添加活跃状态
            button.classList.add('active');
            document.getElementById(targetTab + '-content').classList.add('active');
        });
    });
});

// 初始化平台
const platform = new MultiAgentPlatform();