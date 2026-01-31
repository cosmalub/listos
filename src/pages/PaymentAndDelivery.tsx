import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentAndDelivery = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header with back button */}
            <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Назад
                    </Button>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
                <article className="prose prose-gray lg:prose-lg max-w-none">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Оплата та доставка</h1>
                    <p className="text-xl text-gray-600 mb-8">сервісу «Листосик»</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Оплата</h2>
                            <p className="mb-4">
                                На етапі запуску сервісу оплата обробляється вручну з метою забезпечення уважного та персонального підходу до кожного замовлення.
                            </p>

                            <h3 className="text-xl font-bold mb-3 text-gray-800">Як відбувається оплата</h3>
                            <ol className="list-decimal pl-6 mb-6 space-y-2">
                                <li>Після оформлення замовлення користувач отримує повідомлення від служби підтримки з інструкціями щодо оплати.</li>
                                <li>Оплата здійснюється за реквізитами або посиланням, наданими індивідуально.</li>
                                <li>Після підтвердження оплати користувач отримує доступ до студії створення.</li>
                            </ol>

                            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                                <h3 className="text-lg font-bold mb-3 text-rose-900">Важливо</h3>
                                <ul className="list-disc pl-6 space-y-2 text-rose-800">
                                    <li>Онлайн-оплата безпосередньо на сайті наразі недоступна.</li>
                                    <li>Кожне замовлення перевіряється та підтверджується вручну.</li>
                                    <li>Такий формат є тимчасовим рішенням на етапі запуску сервісу.</li>
                                </ul>
                            </div>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Доставка</h2>
                            <p className="mb-4">
                                Фізична листівка є фінальним етапом сервісу, тому її виготовлення та доставка здійснюються з особливою увагою до деталей.
                            </p>

                            <h3 className="text-xl font-bold mb-3 text-gray-800">Як відбувається доставка</h3>
                            <ol className="list-decimal pl-6 mb-6 space-y-2">
                                <li>Після затвердження фінального макету замовлення передається в друк.</li>
                                <li>Після виготовлення листівка передається до поштової служби.</li>
                                <li>Доставка здійснюється за адресою, вказаною користувачем під час оформлення замовлення.</li>
                            </ol>

                            <h3 className="text-xl font-bold mb-3 text-gray-800">Строки доставки</h3>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li>Строки доставки залежать від регіону та обраної поштової служби.</li>
                                <li>Орієнтовні строки повідомляються користувачу індивідуально.</li>
                            </ul>

                            <h3 className="text-xl font-bold mb-3 text-gray-800">Якщо виникли проблеми з доставкою</h3>
                            <p>
                                У разі затримки, пошкодження або недоставлення листівки користувач може звернутися до служби підтримки для вирішення ситуації.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">Контакти служби підтримки</h2>
                            <ul className="list-none space-y-2">
                                <li><span className="font-medium">Email:</span> melodlistiv@gmail.com</li>
                                <li><span className="font-medium">Telegram:</span> @genbyhuman</li>
                            </ul>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default PaymentAndDelivery;
