
export const datetimeDatabaseToHuman = (datetime: string) => {
    if(!datetime) return '-';
    datetime = datetime.split('.')[0];
    const datetimeArray = datetime.split(/[\sT]+/);
    const dateArray = datetimeArray[0].split('-');
    if(datetimeArray.length == 2){// DateTime
        const timeArray = datetimeArray[1].split(':');
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    } else {// Date
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    }
}

export const nameNormalize = (name: string) => {
    name = name.replace('_', ' ')
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const latLongRule = (input: string) => /^\d+\.\d+$/.test(input)
