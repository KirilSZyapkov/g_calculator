import { data } from "@/db/data";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SelectContent, Select, SelectTrigger, SelectValue, SelectItem, SelectGroup } from "./ui/select";

function Calculator() {
  const [selectedCityFrom, setSelectedCityFrom] = useState<string>("");
  const [numberOfPallets, setNumberOfPallets] = useState<number>(0);
  const [kilograms, setKilograms] = useState<number>(0);
  const [hightOfPallet, setHightOfPallet] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAreaCity, setIsAreaCity] = useState<boolean>(false);
  const cities = Object.keys(data);

  useEffect(() => {
    if (isAreaCity && selectedCityFrom === "Варна") {
      setSelectedCityFrom(prev => prev += " (обл.)");
    } else if (!isAreaCity && selectedCityFrom === "Варна (обл.)") {
      setSelectedCityFrom("Варна");
    }
  }, [isAreaCity, selectedCityFrom]);

  function calculatePrice() {
    setIsLoading(true);
    let quantity: number = 0;
    let errorMessage: string = "";
    let calcQuantityA: number = 0;


    if (selectedCityFrom === "" || numberOfPallets <= 0 || kilograms <= 0 || hightOfPallet <= 0) {
      errorMessage = "Моля, попълнете коректно всички полета. Стойностите не могат да бъдат 0 или отрицателни";
      setIsLoading(false);
      alert(errorMessage);
      return;
    };

    if (!(selectedCityFrom in data)) {
      errorMessage = `Градът "${selectedCityFrom}" не е намерен.`;
      setIsLoading(false);
      alert(errorMessage);
      return;
    };

    if (numberOfPallets > 12) {
      errorMessage = "Пратки над 12 палета, се калкулират и оферират индивидуално! Моля свържете се с нас за оферта на имейл office-varna@gopettrans.com.";
      setIsLoading(false);
      alert(errorMessage);
      return;
    };

    if (hightOfPallet > 240) {
      calcQuantityA = numberOfPallets + 1;
    }

    let calcQuantityB: number = Math.round((kilograms / 1650) / 0.4);

    if (calcQuantityB > numberOfPallets) {
      quantity = calcQuantityB;
    } else if (calcQuantityA > numberOfPallets) {
      quantity = calcQuantityA;
    } else {
      quantity = numberOfPallets;
    };

    let toCity = data[selectedCityFrom as keyof typeof data]
    setPrice(Number(toCity[quantity as keyof typeof toCity]));
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 rounded-2xl">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Данни за пратка</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Град</label>
            <Select value={selectedCityFrom} onValueChange={(value: string) => setSelectedCityFrom(value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-xl">
                <SelectValue placeholder="Изберете град" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none">
                <SelectGroup className="bg-gray-100">
                  {cities.map((city, index) => (
                    <SelectItem key={index} value={city} className="cursor-pointer hover:bg-gray-300">
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer w-4 h-4 rounded"
              defaultChecked={isAreaCity}
              onChange={(e) => setIsAreaCity(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">област</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Брой палета</label>
            <input
              type="number"
              className="w-full py-2 px-3 rounded-xl border border-gray-300 shadow-sm"
              placeholder="например: 3"
              onChange={(e) => setNumberOfPallets(Math.floor(Number(e.target.value)))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Общо килограми</label>
            <input
              type="number"
              className="w-full py-2 px-3 rounded-xl border border-gray-300 shadow-sm"
              placeholder="например: 750"
              onChange={(e) => setKilograms(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Височина на пале (см)</label>
            <input
              type="number"
              className="w-full py-2 px-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2"
              placeholder="например: 180"
              onChange={(e) => setHightOfPallet(Number(e.target.value))}
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-2 px-4 rounded-xl transition ${isLoading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
              }`}
            disabled={isLoading}
            onClick={() => {
              calculatePrice();
            }}
          >
            Изчисли цена
          </Button>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-center mb-1">Цена на пратката</h2>
        <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
          <p className="text-lg font-semibold">{price} лв</p>
        </div>
      </div>
    </div >
  );

}
export default Calculator;