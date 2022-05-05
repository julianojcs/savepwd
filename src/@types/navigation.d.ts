export type FormNavigationProps = {
  id?: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Form: FormNavigationProps;
    }
  }
}

export type CardProps = {
  id: string
  name: string;
  user: string;
  password: string;
}

type Props = {
  data: CardProps;
  onPress: () => void;
}
