import {MATCH_STATUS} from '../validation/matches.js';

export function getMatchStatus(startTime, endTime, now = new Date()) {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;

    if (Number.isNaN(start.getTime()) || (endTime && Number.isNaN(end.getTime()))) {
        return null;
    }

    if (now < start) {
        return MATCH_STATUS.SCHEDULED;
    } else if (end && now >= end) {
        return MATCH_STATUS.FINISHED;
    }
    return MATCH_STATUS.LIVE;
}

export async function syncMatchStatus(match, updateMatchStatus) {
    const nextStatus = getMatchStatus(match.startTime, match.endTime);
    if(!nextStatus) {
        return match.status;
    }
    if (match.status !== nextStatus) {
        await updateMatchStatus(match.id, nextStatus);
        match.status = nextStatus;
    }
    return match.status;
}
