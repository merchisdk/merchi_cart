export interface Alert {
  icon: any;
  message: string;
  show: boolean;
  title: string;
  type: "info" | "success" | "danger" | "warning" | undefined;
}

export interface Tab {
  disabled: boolean;
  icon: any;
  name: string;
  tabId: number;
}
