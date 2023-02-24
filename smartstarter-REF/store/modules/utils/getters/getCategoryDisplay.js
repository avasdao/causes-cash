/**
 * Get Category Display
 *
 * Formatted for display purposes.
 */
const getCategoryDisplay = () => (_category) => {
    switch(_category) {
    case 'adoption':
        return 'Adoption'
    case 'community':
        return 'Community'
    case 'dapp':
        return 'Decentralized App'
    case 'design-art':
        return 'Design & Art'
    case 'education':
        return 'Education'
    case 'film-video':
        return 'Film & Video'
    case 'fun-games':
        return 'Fun & Games'
    case 'hardware':
        return 'Hardware'
    case 'health-wellness':
        return 'Health & Wellness'
    case 'infrastructure':
        return 'Infrastructure'
    case 'music':
        return 'Music'
    case 'privacy':
        return 'Privacy'
    case 'publishing':
        return 'Publishing'
    case 'security':
        return 'Security'
    case 'software':
        return 'Software'
    case 'world-view':
        return 'World View'
    case 'youth':
        return 'Youth'
    default:
        return 'Unknown Category'
    }
}

/* Export module. */
export default getCategoryDisplay
