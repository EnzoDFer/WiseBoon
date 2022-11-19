import { BudgetsProvider } from "../../contexts/BudgetsContext";


export const HomeWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <BudgetsProvider>
      {children}
    </BudgetsProvider>
  );
}