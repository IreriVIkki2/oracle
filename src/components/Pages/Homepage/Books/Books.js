import Editable from "../../../../Hoc/Editable/Editable";
import main from "../../../../../main.css";
import css from "./Books.module.css";

const Books = ({ booksCovers, booksTitle, booksWriteUp }) => {
    console.log(
        "TCL: Books -> {booksCovers, booksTitle, booksWriteUp}",
        Object.values(booksCovers),
        booksTitle,
        booksWriteUp,
    );
    return (
        <Editable
            section="home books"
            elements={{ booksTitle, booksWriteUp, ...booksCovers }}
        >
            <section className={css.Books}>
                <div className={main.Carousel}>
                    <div className={main.CarouselInner300}>
                        {Object.values(booksCovers).map(cover => {
                            return (
                                <div
                                    key={cover.path}
                                    className={main.CarouselItem100}
                                >
                                    <div className={css.ImageOutline}>
                                        <div className={css.ImageOutlineImage}>
                                            <img
                                                className="img-fluid"
                                                src={cover.value}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={css.BooksWriteUp}>
                    <h1 className={`${main.Bubler} mt-4`}>
                        {booksTitle.value}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: booksWriteUp.value }}
                    />
                </div>
            </section>
        </Editable>
    );
};

export default Books;
