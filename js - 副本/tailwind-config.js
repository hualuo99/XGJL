tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#ff7eb3',   
                secondary: '#ff758c', 
                accent: '#ffbd3f',    
                dark: '#884444',      
                light: '#fff0f5',     
            },
            fontFamily: {
                sans:['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', '-apple-system', 'sans-serif'],
                display:['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', '-apple-system', 'sans-serif'],
                mono:['Consolas', '"Courier New"', 'monospace'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'bounce-slow': 'bounce 4s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        }
    }
}