import { GridRowsProp } from "@mui/x-data-grid"

export const dateFilterDefaul = {
    start: "2022-09-01 00:00:01",
    final: "2022-09-30 23:59:59",
}

export const defaultGrid: GridRowsProp = [
]
export interface DataGraph {
    label: any[],
    data: any[],
    description: string
}

export const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`

export const stylesGlobal = {
    Description: {
        fontSize: "16px",
        padding: "0 10px 0"
    },
    Button: {
        backgroundColor: "#8a58ff",
        margin: "0 10px 0"
    },
    Link: {
        borderRadius: "10px",
        backgroundColor: "#8a58ff",
        color: "#fff",
        padding: "10px"
    }
}
