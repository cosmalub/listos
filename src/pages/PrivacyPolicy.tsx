import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Політика конфіденційності</h1>
                    <p className="text-xl text-gray-600 mb-8">сервісу «Листосик»</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Ця Політика конфіденційності описує, які персональні дані збирає сервіс «Листосик», як вони використовуються та як захищаються.
                        </p>
                        <p className="font-medium">
                            Користуючись сервісом «Листосик», ви погоджуєтесь з умовами цієї Політики конфіденційності.
                        </p>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">1. Загальні положення</h2>
                            <p className="mb-2">
                                1.1. Сервіс «Листосик» поважає право користувачів на приватність та докладає всіх розумних зусиль для захисту персональних даних.
                            </p>
                            <p className="mb-2">
                                1.2. Персональні дані обробляються відповідно до чинного законодавства України, зокрема Закону України «Про захист персональних даних».
                            </p>
                            <p>
                                1.3. Ця Політика застосовується до всіх даних, які користувач надає під час користування сервісом «Листосик».
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">2. Які дані ми збираємо</h2>
                            <p className="mb-4">Ми збираємо лише ті дані, які необхідні для надання послуг.</p>

                            <p className="mb-2 font-medium">2.1. Дані, які користувач надає самостійно:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>ім’я або псевдонім;</li>
                                <li>адресу електронної пошти;</li>
                                <li>дані для доставки (ПІБ отримувача, адреса, телефон);</li>
                                <li>текстові матеріали та повідомлення, які користувач створює у сервісі.</li>
                            </ul>

                            <p className="mb-2 font-medium">2.2. Технічні дані:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>IP-адреса;</li>
                                <li>тип пристрою та браузера;</li>
                                <li>дата та час доступу до сервісу.</li>
                            </ul>
                            <p>
                                Ці дані використовуються виключно для забезпечення стабільної та безпечної роботи сервісу.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">3. Як ми використовуємо персональні дані</h2>
                            <p className="mb-4">Персональні дані використовуються виключно з таких цілей:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>надання та виконання замовлених послуг;</li>
                                <li>створення персоналізованого контенту;</li>
                                <li>друк і доставка фізичної листівки;</li>
                                <li>зв’язок з користувачем щодо статусу замовлення;</li>
                                <li>підтримка та зворотний зв’язок.</li>
                            </ul>
                            <p>
                                Ми не використовуємо персональні дані для нав’язливої реклами.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">4. Передача даних третім особам</h2>
                            <p className="mb-2">
                                4.1. Сервіс «Листосик» не продає і не передає персональні дані третім особам з комерційною метою.
                            </p>
                            <p className="mb-2">4.2. Передача даних можлива лише у випадках, коли це необхідно для:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>друку фізичної листівки;</li>
                                <li>організації доставки (поштові та кур’єрські служби);</li>
                                <li>виконання вимог законодавства.</li>
                            </ul>
                            <p>
                                У таких випадках передається мінімально необхідний обсяг даних.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">5. Зберігання та захист даних</h2>
                            <p className="mb-2">
                                5.1. Персональні дані зберігаються не довше, ніж це необхідно для виконання замовлення та дотримання законодавчих вимог.
                            </p>
                            <p className="mb-2">
                                5.2. Сервіс «Листосик» використовує технічні та організаційні заходи для захисту даних від:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>несанкціонованого доступу;</li>
                                <li>втрати;</li>
                                <li>зловживань.</li>
                            </ul>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">6. Права користувача</h2>
                            <p className="mb-2">Користувач має право:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>отримати інформацію про свої персональні дані;</li>
                                <li>вимагати виправлення або видалення своїх даних;</li>
                                <li>відкликати згоду на обробку персональних даних (якщо це не суперечить виконанню замовлення);</li>
                                <li>звернутися зі скаргою у випадку порушення його прав.</li>
                            </ul>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">7. Контент користувача</h2>
                            <p className="mb-2">
                                7.1. Тексти, повідомлення та інший контент, створений користувачем у сервісі, належить користувачу.
                            </p>
                            <p>
                                7.2. Сервіс «Листосик» не використовує цей контент у публічних або маркетингових цілях без окремої згоди користувача.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">8. Зміни до Політики</h2>
                            <p className="mb-2">
                                8.1. Сервіс «Листосик» має право оновлювати цю Політику конфіденційності.
                            </p>
                            <p>
                                8.2. Актуальна версія завжди розміщується на сайті сервісу та набирає чинності з моменту публікації.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">9. Контакти</h2>
                            <p className="mb-4">
                                З усіх питань, пов’язаних із захистом персональних даних, ви можете звернутися до служби підтримки сервісу «Листосик»:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Email: melodlistiv@gmail.com</li>
                                <li>Telegram: @genbyhuman</li>
                            </ul>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section className="text-center pt-4">
                            <p className="font-bold text-gray-900 mb-2">Сервіс «Листосик»</p>
                            <p className="text-gray-600 italic">
                                Ми дбаємо про ваші слова, ваші емоції та вашу приватність.
                            </p>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
