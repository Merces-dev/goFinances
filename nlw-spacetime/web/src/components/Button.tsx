const styles = {
  color: '#F00',
}

interface ButtonProps {
  title: string
}

export default function Button({ title }: ButtonProps) {
  return <p style={styles}>{title}</p>
}
