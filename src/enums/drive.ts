export enum DriveType {
    ZONE_INVALID = 0,
    // 回收站类型zone
    ZONE_TRASH = 1,
    // 普通类型zone
    ZONE_COMMON = 2,
}

export enum FileType {
    // 云盘节点zone
    TYPE_DRIVE_ZONE = 6,
    // 云盘节点folder
    TYPE_DRIVE_FOLDER = 7,
    // 云盘节点file
    TYPE_DRIVE_FILE = 8,
}

 // 文件格式
 export enum FORMAT {
    // 未知类型
    FORMAT_INVALID = 0,
    // 文档-富文本
    FORMAT_DOCUMENT_RICH = 1,
    // 文件-未知
    FORMAT_FILE_UNKNOWN = 30,
    // 文件-图片
    FORMAT_FILE_IMG = 31,
    // 文件-PDF
    FORMAT_FILE_PDF = 32,
    // 文件-表格
    FORMAT_FILE_XLS = 33,
    // 文件-文档
    FORMAT_FILE_DOC = 34,
    // 文件-演示文稿
    FORMAT_FILE_PPT = 35,
    // 文件-音频
    FORMAT_FILE_MP3 = 36,
    // 文件-压缩文件
    FORMAT_FILE_ZIP = 37,
    // 文件-视频，用于存储的
    FORMAT_FILE_MP4 = 38,
    // 文件-WPS 文件
    FORMAT_FILE_WPS = 39,
    // 文件-XMIND 文件
    FORMAT_FILE_XMIND = 40,
    // 视频-用于演示的
    FORMAT_VIDEO_MP4 = 60,
  }