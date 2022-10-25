export const dateFilterDefaul = {
    start: "2022-09-01 00:00:01",
    final: "2022-09-30 23:59:59",
}

export const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`
