export default function Badge({ status }) {
  const badgeColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'paid':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
        case 'expired':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <div className={`inline text-white text-xs md:text-md px-2 py-1 rounded-full ${badgeColor()}`}>
      {status.toUpperCase()}
    </div>
  )
}