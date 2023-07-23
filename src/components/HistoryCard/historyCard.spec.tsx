import React from "react";
import {render} from "@testing-library/react-native"
import { HistoryCard } from ".";
import { Providers } from "../../utils/tests";

describe("HistoryCard Component", () => {
    it("must render correct title, amount and border color.", () => {
        const {getByTestId} = render(
                    <HistoryCard 
                        title={"HistoryTest"} 
                        amount={"987"} 
                        color={"#123456"}
                    />,
                    {
                      wrapper: Providers
                    })
        const historyCard = getByTestId('history-card');
        const title = getByTestId('history-card-title');
        const amount = getByTestId('history-card-amount');

        expect(title.props.children).toEqual("HistoryTest");
        expect(amount.props.children).toEqual("987");
        expect(historyCard.props.style[0].borderLeftColor).toEqual("#123456");
    })
})