
import { redirect } from "next/navigation";
import { Paths } from "@/paths";

interface RedirectUserInputDto {
  query: string;
  page?: number;
  locale?: string;
}

export class RedirectToSearchPageUseCase {

  public static execute(input: RedirectUserInputDto): void {
    const query = input.query;

    if (!query) {
      redirect('/');
    }

    redirect(Paths.searchPage(input));
  }

}
