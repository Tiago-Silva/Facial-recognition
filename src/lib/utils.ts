

export const translateExpressionToEmoji = (expression: string): string => {
    let emoji = '';

    switch (expression) {
        case 'happy':
            emoji = '😀';
            break;
        case 'sad':
            emoji = '😢';
            break;
        case 'angry':
            emoji = '😠';
            break;
        case 'surprised':
            emoji = '😲';
            break;
        case 'disgusted':
            emoji = '🤢';
            break;
        case 'fearful':
            emoji = '😨';
            break;
        case 'neutral':
            emoji = '😐';
            break;
        default:
            emoji = '😐';
            break;
    }

    return emoji;
};
