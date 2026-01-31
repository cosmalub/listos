import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PublicOffer = () => {
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
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Публічна оферта</h1>
                    <p className="text-xl text-gray-600 mb-8">про надання послуг сервісом «Листосик»</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Цей документ є офіційною публічною офертою та визначає умови користування сервісом «Листосик».
                        </p>
                        <p>
                            Оформлюючи замовлення та здійснюючи оплату, користувач підтверджує повне й безумовне прийняття умов цієї оферти.
                        </p>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">1. Загальні положення</h2>
                            <p className="mb-2">
                                1.1. Сервіс «Листосик» — це сервіс створення персоналізованої фізичної листівки формату A6 з індивідуальним цифровим контентом (пісня, текст, візуальне оформлення), який створюється за участі користувача з використанням автоматизованих інструментів.
                            </p>
                            <p className="mb-2">
                                1.2. Виконавець — власник сервісу «Листосик», який надає послуги з організації процесу створення цифрового контенту, друку фізичної листівки та її доставки.
                            </p>
                            <p className="mb-2">
                                1.3. Користувач — фізична особа, яка оформила замовлення та здійснила оплату послуг сервісу.
                            </p>
                            <p>
                                1.4. Оферта вважається акцептованою з моменту оплати замовлення.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">2. Предмет оферти</h2>
                            <p className="mb-2">2.1. Виконавець надає користувачу комплексну послугу, що включає:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>супровід процесу створення персонального текстового та музичного контенту;</li>
                                <li>формування персональної цифрової сторінки з цим контентом;</li>
                                <li>друк фізичної листівки формату A6 з QR-кодом;</li>
                                <li>організацію доставки листівки користувачу або зазначеному отримувачу.</li>
                            </ul>
                            <p>
                                2.2. Користувач усвідомлює та погоджується, що сервіс не продає готовий продукт, а надає послугу зі створення персонального результату за активної участі користувача.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">3. Авторство та контент</h2>
                            <p className="mb-2">
                                3.1. Користувач є єдиним автором текстового та смислового наповнення повідомлення, створеного в сервісі.
                            </p>
                            <p className="mb-2">
                                3.2. Сервіс «Листосик» використовує автоматизовані інструменти, зокрема технології штучного інтелекту, виключно як допоміжний засіб для підтримки користувача у формулюванні його думок.
                            </p>
                            <p className="mb-2">
                                3.3. Виконавець не є автором текстів, пісень або повідомлень, створених користувачем, і не несе відповідальності за їхній зміст.
                            </p>
                            <p className="mb-2">3.4. Користувач гарантує, що створений ним контент:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>відповідає вимогам чинного законодавства;</li>
                                <li>не порушує прав третіх осіб;</li>
                                <li>не містить заборонених, незаконних або образливих матеріалів.</li>
                            </ul>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">4. Оплата та порядок надання послуг</h2>
                            <p className="mb-2">
                                4.1. Оплата послуг здійснюється до отримання доступу до студії створення та початку роботи з сервісом.
                            </p>
                            <p className="mb-2">
                                4.2. Оплата означає придбання комплексної послуги, що включає цифрову частину (створення контенту та персональної сторінки) та фізичну частину (друк і доставку листівки).
                            </p>
                            <p>
                                4.3. Після підтвердження користувачем фінального варіанту та передачі замовлення в друк цифрова частина послуги вважається наданою.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">5. Відповідальність та повернення коштів</h2>
                            <p className="mb-2">5.1. Виконавець несе відповідальність за:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>коректну роботу сервісу;</li>
                                <li>відповідність фізичної листівки затвердженому користувачем макету;</li>
                                <li>належну організацію друку та передачі замовлення в доставку.</li>
                            </ul>
                            <p className="mb-2">
                                5.2. У разі технічної помилки, браку друку або суттєвої невідповідності результату затвердженому макету користувач має право звернутися щодо компенсації, повторного виготовлення або повернення коштів.
                            </p>
                            <p className="mb-2">5.3. Виконавець не несе відповідальності за:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>суб’єктивну емоційну оцінку результату;</li>
                                <li>очікування користувача, які не були прямо заявлені на сайті;</li>
                                <li>зміст повідомлень, створених користувачем.</li>
                            </ul>
                            <p>
                                5.4. Повернення коштів можливе до моменту передачі замовлення в друк або у випадку істотного порушення зобов’язань з боку Виконавця.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">6. Доставка</h2>
                            <p className="mb-2">
                                6.1. Строки та спосіб доставки залежать від обраного користувачем варіанту та роботи поштових служб.
                            </p>
                            <p>
                                6.2. Виконавець не несе відповідальності за затримки доставки, спричинені діями третіх осіб, але зобов’язується сприяти користувачу у вирішенні таких ситуацій.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">7. Персональні дані</h2>
                            <p className="mb-2">
                                7.1. Користувач надає персональні дані виключно в обсязі, необхідному для виконання замовлення.
                            </p>
                            <p>
                                7.2. Виконавець зобов’язується використовувати персональні дані лише з метою надання послуг та не передавати їх третім особам, за винятком випадків, необхідних для друку та доставки.
                            </p>
                        </section>

                        <div className="my-8 flex justify-center">
                            <span className="text-gray-300">⸻</span>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold mb-4 text-gray-900">8. Заключні положення</h2>
                            <p className="mb-2">
                                8.1. Виконавець має право вносити зміни до цієї оферти без попереднього повідомлення, розміщуючи актуальну версію на сайті сервісу.
                            </p>
                            <p className="mb-2">
                                8.2. До правовідносин між користувачем і Виконавцем застосовується чинне законодавство України.
                            </p>
                            <p className="mb-2">
                                8.3. З усіх питань, пов’язаних з роботою сервісу «Листосик», користувач може звернутися до служби підтримки:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>електронна пошта: melodlistiv@gmail.com</li>
                                <li>Telegram: @genbyhuman</li>
                            </ul>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default PublicOffer;
