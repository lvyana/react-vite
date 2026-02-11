/**
 * @file Store类型导出
 * @author ly
 */

// 导出所有slice的类型
export type { LayoutSlice, LanguageType } from './slices/layoutSlice';
export { ThemeType } from './slices/layoutSlice';

export type { UserSlice } from './slices/userSlice';

export type { LogSlice } from './slices/logSlice';

export type { GlobalConfigSlice, HeaderFieldParam, HeaderConfigListParam } from './slices/globalConfigSlice';

export type { KeepAliveSlice, KeepAliveDataItem } from './slices/keepAliveSlice';

export type { StoreState } from './index';
