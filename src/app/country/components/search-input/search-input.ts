import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  public placeHolder = input<string>("Search...");
  public debounceTime = input<number>(1000);
  public initialValue = input<string>('')
  public value = output<string>();
  protected inputValue = linkedSignal<string>(() => this.initialValue());

  protected debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
