export type Orientations = OrientationEnum.down | OrientationEnum.left | OrientationEnum.up | OrientationEnum.right

export enum OrientationEnum {
    'left'= 'left',
    'right'= 'right',
    'up'= 'up',
    'down'= 'down',
}

export enum TimePeriodEnum {
    'future' = 'future',
    'current' = 'current',
    'past' = 'past'
}

export type TimePeriod = TimePeriodEnum.future | TimePeriodEnum.current | TimePeriodEnum.past

export type Alert = {
    id: number,
    message: string,
    type: AlertType,
    animationState: AlertAnimationStateEnum.appear | AlertAnimationStateEnum.dissapear
}

export enum AlertAnimationStateEnum {
    'appear' = 'appear',
    'dissapear' = 'dissapear'
}

export enum AlertTypeEnum {
    'error' = 'error',
    'warn' = 'warn',
    'info' = 'info'
}

export type AlertType =  AlertTypeEnum.error | AlertTypeEnum.warn | AlertTypeEnum.info

export type TableLayout = {
    title: string, 
    type: string,
    isHidden: boolean
    dataKey?: string,
    sortTitle?: string, 
}

export type SortOrder = {
    type: string,
    inStartPosition: boolean
}


export type TableSortOrder = {
    future: SortOrder,
    past: SortOrder,
    current: SortOrder,
}
