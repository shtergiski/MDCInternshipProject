import { Client } from "../Clients/client";
import { Book } from "../Book/book";

export class Lending {
    Book: string;
    Client: string;
    DateOfLending: string;
    DateOfReturn: string;
    Client1: Client;
    Book1: Book;
    LendingID: string;
}