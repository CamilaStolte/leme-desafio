export const theme = {
  colors: {
    background: '#f7f8fa',
    primary: '#4f46e5',
    primaryDark: '#3730a3',
    text: '#22223b',
    textSecondary: '#6c6f7d',
    border: '#e0e3ea',
    white: '#fff',
    error: '#e11d48',
  },
  font: {
    family: 'Inter, Arial, sans-serif',
    size: '16px',
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  radius: '12px',
  shadow: '0 2px 16px 0 rgba(80, 80, 120, 0.08)',
  spacing: (factor: number) => `${factor * 8}px`,
}; 