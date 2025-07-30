import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      card: string;
      border: string;
      icon: string;
      accent: string;
    };
    borderRadius: string;
    spacing: (factor: number) => string;
  }
}
